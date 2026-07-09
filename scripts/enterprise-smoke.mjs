import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const checks = [];
const fail = (name, message) => checks.push({ name, ok: false, message });
const pass = (name, message = 'ok') => checks.push({ name, ok: true, message });
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function assertFile(file) {
  if (fs.existsSync(path.join(root, file))) pass(`file:${file}`);
  else fail(`file:${file}`, 'missing');
}

assertFile('docs/ENTERPRISE_RELEASE_GATE.md');
assertFile('docs/CLIENT_PLATFORM_MATRIX.md');
assertFile('src/pages/movie-tool.js');
assertFile('src/style/movie-tool.css');
assertFile('src-tauri/src/lib.rs');
assertFile('src-tauri/src/commands/assistant.rs');

const lib = read('src-tauri/src/lib.rs');
for (const command of ['assistant::vod_fetch', 'assistant::missav_api_fetch', 'assistant::napp03_api_fetch']) {
  const idx = lib.indexOf(command);
  if (idx < 0) {
    fail(`android-command:${command}`, 'not registered');
    continue;
  }
  const before = lib.slice(Math.max(0, idx - 80), idx);
  if (before.includes('#[cfg(target_os = "windows")]')) fail(`android-command:${command}`, 'still gated by windows cfg');
  else pass(`android-command:${command}`, 'registered cross-platform');
}

const movie = read('src/pages/movie-tool.js');
if (movie.includes('function allowPublicCorsProxy()')) pass('cors-proxy-gate', 'public proxy gated to local browser dev');
else fail('cors-proxy-gate', 'missing official-client proxy gate');

if (/https:\/\/(api\.allorigins\.win|corsproxy\.io)/.test(movie) && !movie.includes('allowPublicCorsProxy()')) {
  fail('public-cors-proxy', 'public proxy appears without gate');
} else {
  pass('public-cors-proxy', 'no ungated public proxy detected');
}

if (movie.includes('Tauri 后端请求失败，正式客户端已禁用公网 CORS 代理')) pass('official-error-message');
else fail('official-error-message', 'missing official-client backend failure message');

const css = read('src/style/movie-tool.css');
for (const selector of ['@media (max-width: 720px)', '.tvbox-player-box', '.tvbox-myavlive-app .tvbox-missav-list']) {
  if (css.includes(selector)) pass(`mobile-css:${selector}`);
  else fail(`mobile-css:${selector}`, 'missing');
}

const pkg = JSON.parse(read('package.json'));
for (const dep of ['@tauri-apps/plugin-dialog', '@tauri-apps/plugin-autostart']) {
  if (pkg.dependencies?.[dep]) pass(`dependency:${dep}`, pkg.dependencies[dep]);
  else fail(`dependency:${dep}`, 'missing');
}

const failed = checks.filter(x => !x.ok);
console.log(JSON.stringify({ ok: failed.length === 0, failed, checks }, null, 2));
if (failed.length) process.exit(1);
