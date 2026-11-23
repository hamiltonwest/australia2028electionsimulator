const express = require('express');
const path = require('path');

const BLOCKED_FILES = new Set([
  '/server.js',
  '/server.test.js',
  '/package.json',
  '/package-lock.json',
  '/metadata.json',
  '/cname',
  '/readme.md',
  '/.nojekyll',
]);

const BLOCKED_PREFIXES = [
  '/node_modules',
  '/.git',
  '/.github',
  '/.playwright-cli',
  '/.aistudio',
];

function isBlockedPath(rawPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(rawPath || '/');
  } catch {
    return true;
  }
  const normalized = path.posix.normalize(decoded).toLowerCase();
  if (BLOCKED_FILES.has(normalized)) return true;
  return BLOCKED_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(prefix + '/')
  );
}

function createApp(rootDir = __dirname) {
  const app = express();
  app.disable('x-powered-by');

  app.use((req, res, next) => {
    if (isBlockedPath(req.path)) {
      return res.status(404).sendFile(path.join(rootDir, '404.html'));
    }
    next();
  });

  app.use(
    express.static(rootDir, {
      extensions: ['html'],
      index: 'index.html',
      dotfiles: 'ignore',
    })
  );

  app.use((req, res) => {
    res.status(404).sendFile(path.join(rootDir, '404.html'));
  });

  return app;
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  const host = '0.0.0.0';
  const app = createApp();
  app.listen(port, host, () => {
    console.log(`Australia 2028 Election Simulator listening on http://${host}:${port}`);
  });
}

module.exports = { createApp, isBlockedPath };
