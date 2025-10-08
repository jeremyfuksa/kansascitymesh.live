---
title: Coverage Priorities
description: Understand the current footprint of the KC mesh and where additional routers will make the biggest impact.
pageHeading: Coverage Priorities
heroVariant: compact
---

I mapped existing nodes, captured signal reports, and combined them with elevation data to figure out which placements move the Kansas City mesh forward fastest. Here's what I know so far.

<figure class="mb-4">
  <img
    src="/images/latest-node-map.jpeg"
    alt="Current Kansas City mesh coverage map"
    class="img-fluid rounded shadow-sm"
    loading="lazy"
    decoding="async"
  />
  <figcaption class="small text-muted mt-2">
    Quick snapshot of KC nodes as of early 2025. The live map will replace this once the data pipeline is wired up.
  </figcaption>
</figure>

## Current coverage snapshot

Right now the mesh runs entirely on client-class nodes clustered around the northeast side of the metro. Elevated home installs near Liberty and North Kansas City can usually hear each other five to eight miles out, but nothing is acting as a 24/7 backbone router yet. Once we secure a rooftop or tower host, that node will anchor the rest of the metro.

Drive testing from North Kansas City down to Midtown shows consistent reception, with occasional dead spots where buildings or terrain block the signal. Moving southeast or west, coverage falls off quickly.

### Router strategy

The metro only needs routers where we can combine serious elevation with 24/7 power and clean RF environments. If you have access to a repeater tower, commercial rooftop, or other tall structure, let's coordinate so you can take on one of those backbone deployments. Everyone else should keep their nodes in client or client base roles so the channel stays efficient. That also means the four-router backbone remains a roadmap until we recruit the right high-elevation partners.

## What counts as "good enough"

- **15–20 ft up, even indoors** is an immediate win if your house sits on a hill or has consistent line-of-sight.
- **Outdoor omni antennas at 20–30 ft** will reliably cover most neighborhoods.
- **Commercial rooftops or tall apartment buildings** become area-wide repeaters.
- **Portable nodes** won't make a backbone, but they provide valuable coverage reports along their routes.

If you can hit one or more of those, you're useful right now.

## Priority zones

### 1. West-side backbone (Johnson County)

A router near Shawnee Mission or Prairie Village with decent height bridges the current network gap west of the river.

- Aim for rooftops, office buildings, or any location with clear line-of-sight toward Midtown and The Plaza.
- Even a 15–20 ft mast on a residential two-story could close the gap temporarily.

### 2. North KC reinforcement

Nodes on higher ground in Gladstone, Claycomo, or Smithville would create redundancy and extend coverage with the existing Northland client cluster.

- Look for opportunities to place antennas on rooftops, water towers (with permission), or hilltops.
- Even a portable node on a third-floor apartment balcony helps validate range.

### 3. South metro coverage

Belton, Grandview, and the southern edge of Kansas City need nodes to extend the mesh down I-49.

- Installations on neighborhood masts, eaves, or barn roofs will fill in gaps.
- If you can secure space near Lee's Summit or Raymore, it's an easy win.

### 4. East corridor fill-in

Blue Springs, Independence, and Grain Valley already show light coverage. A few more nodes there would create reliable east-west connectivity.

- Focus on rooftops or structures that crest hills or ridgelines.
- Portable nodes on commuter routes help map the gap until permanent routers go in.

## How to evaluate placements

When someone proposes a site, here's what to look at:

1. **Elevation:** Natural high ground beats adding metal towers unless you're going total overkill.
2. **Line-of-sight:** Can you see (or almost see) the Northland/Downtown cluster or a candidate rooftop host? If not, can you bridge to someone who can?
3. **Power and maintenance:** Indoor power is the dream. Outdoor setups should have weatherproof enclosures and surge protection.
4. **Community impact:** Will this help a dense area or connect two existing nodes? That's the deciding factor.

Before you invest in a permanent install or elaborate experiment, pitch it in the
[KC Meshtastic Discord](https://discord.gg/eP5VSPKU). A thirty-second sanity
check saves everyone from fighting extra noise or duplicate work.

## DIY coverage mapping

I use USGS elevation data, and drive tests to validate what's possible. You can do the same:

1. Deploy a node on your roof or balcony.
2. Leave it running for a week.
3. Capture GPS traces while driving around your neighborhood.
4. Drop your findings in the Discord so we can adjust the plan.

## GeoJSON target area

Here's the exact geo-fence I'm focusing on:

<details>
<summary>KC mesh priority polygon</summary>

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "KC Metro Mesh Target Area",
        "stroke": "#E31837",
        "stroke-width": 3,
        "fill": "#E31837",
        "fill-opacity": 0.2
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-95.148729, 39.561616],
            [-93.948472, 39.561616],
            [-93.948472, 38.649439],
            [-95.148729, 38.649439],
            [-95.148729, 39.561616]
          ]
        ]
      }
    }
  ]
}
```

</details>

Deployments inside that box strengthen the core metro mesh. Once we have solid coverage there, expanding outward makes more sense.

**Want to help?** [Get started with your own node](/get-started/join) and log your progress in the
[KC Meshtastic Discord](https://discord.gg/eP5VSPKU).
