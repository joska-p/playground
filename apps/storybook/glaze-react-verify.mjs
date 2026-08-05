import { chromium } from 'playwright';

const base = 'http://localhost:6006';

const stories = [
  { id: 'glaze-react-surfacepainting--cpu-surface', field: 'cpuSurface', label: 'cpuSurface' },
  { id: 'glaze-react-surfacepainting--gpu-surface', field: 'gpuSurface', label: 'gpuSurface' },
  { id: 'glaze-react-programmaticrendering--gpu-shader', field: 'gpuShader', label: 'gpuShader' },
  { id: 'glaze-react-programmaticrendering--cpu-animated', field: 'cpuAnimated', label: 'cpuAnimated' }
];

const browser = await chromium.launch({
  headless: false,
  args: [
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--ignore-gpu-blocklist'
  ]
});

const results = {};
const consoleErrors = [];

for (const { id, field, label } of stories) {
  const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[${label}] ${msg.text()}`);
  });
  page.on('pageerror', (err) => consoleErrors.push(`[${label}] pageerror: ${err.message}`));
  try {
    await page.goto(`${base}/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'load', timeout: 60000 });
    const proof = await page.waitForFunction(
      (f) => {
        const w = window;
        const p = w.__glazeReact;
        return p && p[f] !== undefined;
      },
      field,
      { timeout: 30000 }
    );
    const value = await page.evaluate((f) => window.__glazeReact[f], field);
    results[label] = value;
  } catch (err) {
    results[label] = `ERROR: ${err.message}`;
  }
  await page.close();
}

await browser.close();

console.log(JSON.stringify(results, null, 2));
if (consoleErrors.length) {
  console.log('--- console errors ---');
  for (const e of [...new Set(consoleErrors)]) console.log(e);
}
