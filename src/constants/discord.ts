export const DISCORD_INVITE = 'https://discord.gg/yr2QTFSvzN';

/**
 * Discord server snowflake ID. Kept here for reference; not used at runtime.
 * The server-side cron at /home/admin/generate-mesh-stats.py queries the
 * Discord guild API with this ID and bakes member/online counts into
 * /api/stats.json, which the site fetches.
 *
 * If you fork this for your city: change this ID, change DISCORD_INVITE
 * above, and update the cron script's DISCORD_GUILD_ID to match.
 */
export const DISCORD_GUILD_ID = '1424474686619783191';
