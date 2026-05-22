#!/usr/bin/python3
"""Generate a small JSON stats blob about the KC Meshtastic mesh.

Fetches MeshMonitor's public API plus the KC Mesh Discord guild's member
counts, computes total/active node counts and a hardware breakdown, and
writes the result atomically to a path served by nginx. The
kansascitymesh.live website fetches this file client-side to render stats.

Run via cron every 5 minutes. On primary fetch failure (mesh nodes), exits
non-zero and leaves the previous JSON file untouched so the site never sees
a degenerate snapshot. Optional fetches (upstream stats, Discord) degrade
gracefully — their fields become null in the output.

Reads DISCORD_BOT_TOKEN from /home/admin/.env (or the environment) to call
the Discord guild API with with_counts=true. Without the token, Discord
fields are omitted.
"""
import json
import os
import sys
import tempfile
import urllib.error
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

NODES_ENDPOINT = "https://map.kansascitymesh.live/api/nodes"
STATS_ENDPOINT = "https://map.kansascitymesh.live/api/stats"
DISCORD_GUILD_ID = "1424474686619783191"
DISCORD_API_BASE = "https://discord.com/api/v10"
OUTPUT_PATH = Path("/home/admin/kcml-stats/stats.json")
ENV_FILE = Path("/home/admin/.env")
USER_AGENT = "kcml-stats/3"
HTTP_TIMEOUT = 15
SCHEMA_VERSION = 3

ACTIVE_WINDOWS = {
    "1h": 3600,
    "24h": 86400,
    "7d": 7 * 86400,
    "30d": 30 * 86400,
    "90d": 90 * 86400,
}

# Source: meshtastic/protobufs master mesh.proto, HardwareModel enum.
# Refresh when upstream adds new IDs; unknown_hwmodel_ids in the output will flag misses.
HW_MODELS = {
    0: "UNSET", 1: "TLORA_V2", 2: "TLORA_V1", 3: "TLORA_V2_1_1P6", 4: "TBEAM",
    5: "HELTEC_V2_0", 6: "TBEAM_V0P7", 7: "T_ECHO", 8: "TLORA_V1_1P3", 9: "RAK4631",
    10: "HELTEC_V2_1", 11: "HELTEC_V1", 12: "LILYGO_TBEAM_S3_CORE", 13: "RAK11200",
    14: "NANO_G1", 15: "TLORA_V2_1_1P8", 16: "TLORA_T3_S3", 17: "NANO_G1_EXPLORER",
    18: "NANO_G2_ULTRA", 19: "LORA_TYPE", 20: "WIPHONE", 21: "WIO_WM1110",
    22: "RAK2560", 23: "HELTEC_HRU_3601", 24: "HELTEC_WIRELESS_BRIDGE",
    25: "STATION_G1", 26: "RAK11310", 27: "SENSELORA_RP2040", 28: "SENSELORA_S3",
    29: "CANARYONE", 30: "RP2040_LORA", 31: "STATION_G2", 32: "LORA_RELAY_V1",
    33: "T_ECHO_PLUS", 34: "PPR", 35: "GENIEBLOCKS", 36: "NRF52_UNKNOWN",
    37: "PORTDUINO", 38: "ANDROID_SIM", 39: "DIY_V1", 40: "NRF52840_PCA10059",
    41: "DR_DEV", 42: "M5STACK", 43: "HELTEC_V3", 44: "HELTEC_WSL_V3",
    45: "BETAFPV_2400_TX", 46: "BETAFPV_900_NANO_TX", 47: "RPI_PICO",
    48: "HELTEC_WIRELESS_TRACKER", 49: "HELTEC_WIRELESS_PAPER", 50: "T_DECK",
    51: "T_WATCH_S3", 52: "PICOMPUTER_S3", 53: "HELTEC_HT62", 54: "EBYTE_ESP32_S3",
    55: "ESP32_S3_PICO", 56: "CHATTER_2", 57: "HELTEC_WIRELESS_PAPER_V1_0",
    58: "HELTEC_WIRELESS_TRACKER_V1_0", 59: "UNPHONE", 60: "TD_LORAC",
    61: "CDEBYTE_EORA_S3", 62: "TWC_MESH_V4", 63: "NRF52_PROMICRO_DIY",
    64: "RADIOMASTER_900_BANDIT_NANO", 65: "HELTEC_CAPSULE_SENSOR_V3",
    66: "HELTEC_VISION_MASTER_T190", 67: "HELTEC_VISION_MASTER_E213",
    68: "HELTEC_VISION_MASTER_E290", 69: "HELTEC_MESH_NODE_T114",
    70: "SENSECAP_INDICATOR", 71: "TRACKER_T1000_E", 72: "RAK3172",
    73: "WIO_E5", 74: "RADIOMASTER_900_BANDIT", 75: "ME25LS01_4Y10TD",
    76: "RP2040_FEATHER_RFM95", 77: "M5STACK_COREBASIC", 78: "M5STACK_CORE2",
    79: "RPI_PICO2", 80: "M5STACK_CORES3", 81: "SEEED_XIAO_S3",
    82: "MS24SF1", 83: "TLORA_C6", 84: "WISMESH_TAP", 85: "ROUTASTIC",
    86: "MESH_TAB", 87: "MESHLINK", 88: "XIAO_NRF52_KIT", 89: "THINKNODE_M1",
    90: "THINKNODE_M2", 91: "T_ETH_ELITE", 92: "HELTEC_SENSOR_HUB",
    93: "MUZI_BASE", 94: "HELTEC_MESH_POCKET", 95: "SEEED_SOLAR_NODE",
    96: "NOMADSTAR_METEOR_PRO", 97: "CROWPANEL", 98: "LINK_32",
    99: "SEEED_WIO_TRACKER_L1", 100: "SEEED_WIO_TRACKER_L1_EINK",
    101: "MUZI_R1_NEO", 102: "T_DECK_PRO", 103: "T_LORA_PAGER",
    104: "M5STACK_RESERVED", 105: "WISMESH_TAG", 106: "RAK3312",
    107: "THINKNODE_M5", 108: "HELTEC_MESH_SOLAR", 109: "T_ECHO_LITE",
    110: "HELTEC_V4", 111: "M5STACK_C6L", 112: "M5STACK_CARDPUTER_ADV",
    113: "HELTEC_WIRELESS_TRACKER_V2", 114: "T_WATCH_ULTRA",
    115: "THINKNODE_M3", 116: "WISMESH_TAP_V2", 117: "RAK3401",
    118: "RAK6421", 119: "THINKNODE_M4", 120: "THINKNODE_M6",
    121: "MESHSTICK_1262", 122: "TBEAM_1_WATT", 123: "T5_S3_EPAPER_PRO",
    124: "TBEAM_BPF", 125: "MINI_EPAPER_S3", 126: "TDISPLAY_S3_PRO",
    127: "HELTEC_MESH_NODE_T096", 128: "TRACKER_T1000_E_PRO",
    129: "THINKNODE_M7", 130: "THINKNODE_M8", 131: "THINKNODE_M9",
    132: "HELTEC_V4_R8", 133: "HELTEC_MESH_NODE_T1", 134: "STATION_G3",
    135: "T_IMPULSE_PLUS", 136: "T_ECHO_CARD", 255: "PRIVATE_HW",
}

TOP_HARDWARE_LIMIT = 10

# Backbone-table selector. Role 12 is ROUTER_LATE in current firmware — the
# role intended for fixed, infrastructure-grade nodes. We surface every
# role-12 node that's been heard in the last BACKBONE_WINDOW_SECONDS, sorted
# by last-heard descending, capped at BACKBONE_LIMIT. Older role-12 nodes
# fall off naturally instead of cluttering the table.
BACKBONE_ROLES = {"12"}
BACKBONE_WINDOW_SECONDS = 30 * 86400
BACKBONE_LIMIT = 15


def fetch_json(url: str, headers: dict | None = None) -> object:
    req_headers = {"User-Agent": USER_AGENT}
    if headers:
        req_headers.update(headers)
    req = urllib.request.Request(url, headers=req_headers)
    with urllib.request.urlopen(req, timeout=HTTP_TIMEOUT) as resp:
        if resp.status != 200:
            raise RuntimeError(f"{url} returned HTTP {resp.status}")
        return json.loads(resp.read())


def read_env_file(path: Path) -> dict[str, str]:
    """Parse a simple KEY=VALUE .env file. Cron jobs run with minimal env,
    so the script reads /home/admin/.env directly rather than relying on
    the shell to source it."""
    out: dict[str, str] = {}
    if not path.exists():
        return out
    try:
        for raw in path.read_text().splitlines():
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            # Strip surrounding quotes if present.
            value = value.strip()
            if len(value) >= 2 and value[0] == value[-1] and value[0] in ("'", '"'):
                value = value[1:-1]
            out[key.strip()] = value
    except OSError:
        return {}
    return out


def fetch_discord_stats(token: str) -> dict:
    """Query the Discord guild API for member counts. Returns
    {discord_total_members, discord_online}. Either value can be None if
    the API doesn't return it. Raises on network/auth failure so the
    caller can decide to degrade gracefully."""
    url = f"{DISCORD_API_BASE}/guilds/{DISCORD_GUILD_ID}?with_counts=true"
    payload = fetch_json(url, headers={"Authorization": f"Bot {token}"})
    if not isinstance(payload, dict):
        raise RuntimeError("discord guild payload was not an object")
    return {
        "discord_total_members": payload.get("approximate_member_count"),
        "discord_online": payload.get("approximate_presence_count"),
    }


def hw_entry(hw_id: int, count: int, total: int) -> dict:
    return {
        "hw_model": hw_id,
        "name": HW_MODELS.get(hw_id, f"UNKNOWN_{hw_id}"),
        "count": count,
        "percent": round(100 * count / total, 1) if total else 0.0,
    }


def backbone_entry(node: dict, now_epoch: int) -> dict:
    user = node.get("user") or {}
    last_heard = node.get("lastHeard") or 0
    hw_id = user.get("hwModel")
    return {
        "short_name": user.get("shortName") or "",
        "long_name": user.get("longName") or "",
        "hw_model_id": hw_id,
        "hw_model_name": HW_MODELS.get(hw_id) if hw_id is not None else None,
        "role": user.get("role"),
        "hops": node.get("lastMessageHops"),
        "last_heard_epoch": last_heard,
        "last_heard_age_seconds": max(0, now_epoch - last_heard) if last_heard else None,
    }


def compute_stats(
    nodes: list,
    upstream_stats: dict,
    discord_stats: dict,
    now_epoch: int,
) -> dict:
    total_nodes = len(nodes)
    nodes_with_hw = 0
    unknown_ids: set[int] = set()

    active_counts = {label: 0 for label in ACTIVE_WINDOWS}
    hw_counts_all: Counter = Counter()
    hw_counts_30d: Counter = Counter()
    backbone_candidates: list[tuple[int, dict]] = []

    thirty_d = ACTIVE_WINDOWS["30d"]

    for node in nodes:
        user = node.get("user") or {}
        hw = user.get("hwModel")
        last_heard = node.get("lastHeard") or 0
        age = max(0, now_epoch - last_heard)

        for label, window in ACTIVE_WINDOWS.items():
            if last_heard and age <= window:
                active_counts[label] += 1

        if hw is not None:
            nodes_with_hw += 1
            hw_counts_all[hw] += 1
            if hw not in HW_MODELS:
                unknown_ids.add(hw)
            if last_heard and age <= thirty_d:
                hw_counts_30d[hw] += 1

        if user.get("role") in BACKBONE_ROLES and last_heard and age <= BACKBONE_WINDOW_SECONDS:
            backbone_candidates.append((last_heard, node))

    top_all = [hw_entry(hw, c, nodes_with_hw) for hw, c in hw_counts_all.most_common(TOP_HARDWARE_LIMIT)]
    top_30d_total = sum(hw_counts_30d.values())
    top_30d = [hw_entry(hw, c, top_30d_total) for hw, c in hw_counts_30d.most_common(TOP_HARDWARE_LIMIT)]

    backbone_candidates.sort(key=lambda pair: pair[0], reverse=True)
    backbone_nodes = [backbone_entry(n, now_epoch) for _, n in backbone_candidates[:BACKBONE_LIMIT]]

    return {
        "schema_version": SCHEMA_VERSION,
        "generated_at": datetime.fromtimestamp(now_epoch, tz=timezone.utc).isoformat().replace("+00:00", "Z"),
        "generated_at_epoch": now_epoch,
        "source": NODES_ENDPOINT,
        "total_nodes": total_nodes,
        "nodes_with_hwmodel": nodes_with_hw,
        "message_count": upstream_stats.get("messageCount"),
        "channel_count": upstream_stats.get("channelCount"),
        "active_window_seconds": ACTIVE_WINDOWS,
        "active_counts": active_counts,
        "top_hardware_30d": top_30d,
        "top_hardware_all": top_all,
        "backbone_nodes": backbone_nodes,
        "backbone_window_seconds": BACKBONE_WINDOW_SECONDS,
        "unknown_hwmodel_ids": sorted(unknown_ids),
        "discord_total_members": discord_stats.get("discord_total_members"),
        "discord_online": discord_stats.get("discord_online"),
    }


def write_atomic(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(payload, indent=2, sort_keys=False) + "\n"
    fd, tmp_name = tempfile.mkstemp(prefix=".stats-", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w") as f:
            f.write(body)
        os.chmod(tmp_name, 0o644)
        os.replace(tmp_name, path)
    except Exception:
        try:
            os.unlink(tmp_name)
        except OSError:
            pass
        raise


def main() -> int:
    now_epoch = int(datetime.now(tz=timezone.utc).timestamp())
    try:
        nodes = fetch_json(NODES_ENDPOINT)
    except (urllib.error.URLError, TimeoutError, OSError, RuntimeError, json.JSONDecodeError) as e:
        print(f"[{datetime.now(tz=timezone.utc).isoformat()}] fetch nodes failed: {e}", file=sys.stderr)
        return 1

    if not isinstance(nodes, list) or not nodes:
        print(f"[{datetime.now(tz=timezone.utc).isoformat()}] refusing to write: nodes payload empty or wrong type", file=sys.stderr)
        return 2

    try:
        upstream_stats = fetch_json(STATS_ENDPOINT)
        if not isinstance(upstream_stats, dict):
            upstream_stats = {}
    except (urllib.error.URLError, TimeoutError, OSError, RuntimeError, json.JSONDecodeError) as e:
        # Non-fatal: continue with empty upstream stats. message_count / channel_count just become null.
        print(f"[{datetime.now(tz=timezone.utc).isoformat()}] fetch stats failed (continuing): {e}", file=sys.stderr)
        upstream_stats = {}

    # Discord guild fetch — optional. Falls back to {} if the token is
    # missing or the API call fails. Token comes from /home/admin/.env
    # rather than the process env so cron jobs (which run with minimal
    # environment) pick it up reliably.
    discord_stats: dict = {}
    env_values = read_env_file(ENV_FILE)
    discord_token = os.environ.get("DISCORD_BOT_TOKEN") or env_values.get("DISCORD_BOT_TOKEN")
    if discord_token:
        try:
            discord_stats = fetch_discord_stats(discord_token)
        except (urllib.error.URLError, TimeoutError, OSError, RuntimeError, json.JSONDecodeError) as e:
            print(
                f"[{datetime.now(tz=timezone.utc).isoformat()}] fetch discord failed (continuing): {e}",
                file=sys.stderr,
            )
    else:
        print(
            f"[{datetime.now(tz=timezone.utc).isoformat()}] no DISCORD_BOT_TOKEN; skipping discord fetch",
            file=sys.stderr,
        )

    payload = compute_stats(nodes, upstream_stats, discord_stats, now_epoch)
    write_atomic(OUTPUT_PATH, payload)
    print(
        f"[{payload['generated_at']}] wrote {OUTPUT_PATH} "
        f"total={payload['total_nodes']} active_24h={payload['active_counts']['24h']} "
        f"discord_members={payload.get('discord_total_members')} "
        f"discord_online={payload.get('discord_online')}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
