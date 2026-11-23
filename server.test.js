const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp, isBlockedPath } = require('./server');

async function withServer(fn) {
  const app = createApp(__dirname);
  const server = await new Promise((resolve) => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await fn(baseUrl);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('isBlockedPath blocks internal project files and directories', () => {
  assert.equal(isBlockedPath('/server.js'), true);
  assert.equal(isBlockedPath('/package.json'), true);
  assert.equal(isBlockedPath('/node_modules/express/index.js'), true);
  assert.equal(isBlockedPath('/.github/workflows/pages.yml'), true);
  assert.equal(isBlockedPath('/index.html'), false);
  assert.equal(isBlockedPath('/assets/css/site.css'), false);
});

test('serves index.html, secondary pages, static assets, and 404 fallback', async () => {
  await withServer(async (baseUrl) => {
    const homeRes = await fetch(`${baseUrl}/`);
    assert.equal(homeRes.status, 200);
    const homeHtml = await homeRes.text();
    assert.match(homeHtml, /Australia 2028 Election Simulator/);

    const aboutRes = await fetch(`${baseUrl}/about.html`);
    assert.equal(aboutRes.status, 200);

    const cssRes = await fetch(`${baseUrl}/assets/css/site.css`);
    assert.equal(cssRes.status, 200);
    assert.match(cssRes.headers.get('content-type') || '', /text\/css/);

    const blockedRes = await fetch(`${baseUrl}/server.js`);
    assert.equal(blockedRes.status, 404);

    const missingRes = await fetch(`${baseUrl}/does-not-exist`);
    assert.equal(missingRes.status, 404);
    const missingHtml = await missingRes.text();
    assert.match(missingHtml, /Page not found/);
  });
});
