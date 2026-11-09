/** Local browser QA only: synthetic observations are visibly labelled. Never deployed. */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const port = Number(process.argv[2] || 4321);
const mode = process.argv[3] || 'fresh';
let activeMode = mode;
const root = path.resolve('dist');
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/__qa/fail' && req.method === 'POST') {
    activeMode = 'unavailable';
    res.writeHead(204);
    res.end();
    return;
  }
  if (url.pathname === '/api/stats.json') {
    if (activeMode === 'unavailable') {
      res.writeHead(503);
      res.end('Unavailable fixture');
      return;
    }
    const age = mode === 'stale' ? 7200 : 60;
    const generated = Date.now() - age * 1000;
    const rows =
      mode === 'empty'
        ? []
        : [
            { name: 'HELTEC_V3', count: 116, percent: 33.1 },
            { name: 'RAK4631', count: 82, percent: 23.4 },
            { name: 'HELTEC_V4', count: 31, percent: 8.8 },
            { name: 'TRACKER_T1000_E', count: 20, percent: 5.7 },
            { name: 'SEEED_WIO_TRACKER_L1', count: 16, percent: 4.6 },
          ];
    const stats = {
      schema_version: 3,
      generated_at: new Date(generated).toISOString(),
      total_nodes: 420,
      nodes_with_hwmodel: 351,
      active_counts: { '1h': 12, '24h': 30, '7d': 65, '30d': 205, '90d': 280 },
      top_hardware_all: rows,
      top_hardware_30d: rows,
      message_count: null,
      channel_count: 2,
      discord_total_members: 225,
      discord_online: 45,
      backbone_nodes:
        mode === 'empty'
          ? []
          : [0, 1, 2, 3, 4, 5].map((n) => ({
              short_name: `QA-${n + 1}`,
              long_name: `Preview router ${n + 1}`,
              hw_model_name: 'HELTEC_V3',
              hops: n,
              role: 'ROUTER_LATE',
              last_heard_epoch: generated / 1000 - n * 300,
              last_heard_age_seconds: n * 300,
            })),
    };
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(mode === 'malformed' ? { error: 'bad fixture' } : stats));
    return;
  }
  try {
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(root + path.sep) && file !== root) throw Error('Outside preview');
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    let content = await fs.readFile(file);
    const type = mime[path.extname(file)] || 'application/octet-stream';
    if (type === 'text/html')
      content = Buffer.from(
        content
          .toString()
          .replace('<body', `<body data-preview="${mode}"`)
          .replace(
            '</body>',
            `<p style="position:fixed;bottom:0;left:0;right:0;z-index:999;background:#332b17;color:white;text-align:center;margin:0;padding:4px;font:13px monospace">LOCAL QA · synthetic ${mode} data <button onclick="fetch('/__qa/fail',{method:'POST'}).then(()=>document.dispatchEvent(new Event('visibilitychange')))">Simulate refresh failure</button></p></body>`,
          ),
      );
    res.writeHead(200, { 'Content-Type': type });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(`Local ${mode} fixture preview: http://127.0.0.1:${port}`),
);
