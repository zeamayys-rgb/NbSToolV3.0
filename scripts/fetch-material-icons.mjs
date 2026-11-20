// Copy the Material Symbols icons this project uses into assets/icons/material/ (DEC-80).
//
// Only the icons listed in ICONS are copied, never the whole library. To add one, find its
// name at https://fonts.google.com/icons (style: Outlined), add it to ICONS, and re-run:
//
//   node scripts/fetch-material-icons.mjs
//
// Every icon is the same cut: Material Symbols Outlined, weight 400, grade 0, optical size 24.
// "name" gives the outline; "name:fill" also writes the filled version as name-fill.svg.
// Each file is rewritten to draw in currentColor so it takes its colour from CSS, never a hex.
// No dependencies; needs Node 18+ for fetch.

import { mkdir, writeFile, readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ICONS = [
  // Navigation and direction
  'arrow_forward', 'arrow_back', 'arrow_upward', 'arrow_downward',
  'chevron_right', 'chevron_left', 'expand_more', 'expand_less',
  'keyboard_double_arrow_right', 'unfold_less', 'open_in_new', 'menu', 'more_vert',
  // Actions
  'close', 'check', 'add', 'remove', 'search', 'refresh', 'download', 'upload', 'save',
  'edit', 'delete', 'content_copy', 'send', 'logout', 'filter_list', 'sort',
  'grid_view', 'view_list', 'visibility', 'visibility_off', 'play_arrow', 'play_circle',
  'draw', 'print',
  // Help and status
  'question_mark', 'help', 'info:fill', 'warning:fill', 'error:fill',
  'check_circle:fill', 'cancel:fill', 'task_alt', 'lightbulb', 'notifications',
  // Objects
  'description', 'folder', 'map', 'location_on', 'mail', 'call', 'lock', 'key',
  'person', 'group', 'language', 'sell', 'shield', 'schedule', 'calendar_today',
  'desktop_windows', 'database', 'monitoring', 'bar_chart', 'layers', 'home',
  'account_balance', 'settings',
  // Place, nature and climate (the Data Analyser card heads, GC_ICONS)
  'public', 'landscape', 'terrain', 'park', 'nature', 'forest', 'eco', 'pets',
  'water_drop', 'cloud', 'sunny', 'device_thermostat', 'local_fire_department', 'bolt:fill', 'water',
];

const SRC = 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined';
const LICENSE_URL = 'https://raw.githubusercontent.com/google/material-design-icons/master/LICENSE';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'icons', 'material');

async function get(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

// Drop the fixed 24px size and draw in currentColor; keep Material's 960-unit viewBox.
function clean(svg) {
  return svg
    .replace(/\s(height|width|fill)="[^"]*"/g, '')
    .replace('<svg ', '<svg fill="currentColor" ')
    .trim() + '\n';
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const wanted = new Set();
  const jobs = [];
  for (const entry of ICONS) {
    const [name, variant] = entry.split(':');
    jobs.push([name, 'default', `${name}.svg`]);
    if (variant === 'fill') jobs.push([name, 'fill1', `${name}-fill.svg`]);
  }
  const failed = [];
  await Promise.all(jobs.map(async ([name, style, file]) => {
    wanted.add(file);
    try {
      await writeFile(path.join(OUT, file), clean(await get(`${SRC}/${name}/${style}/24px.svg`)));
    } catch (e) { failed.push(`${file}: ${e.message}`); }
  }));
  await writeFile(path.join(OUT, 'LICENSE'), await get(LICENSE_URL));

  // Remove icons that were taken off the list, so the folder always matches ICONS.
  for (const f of await readdir(OUT)) {
    if (f.endsWith('.svg') && !wanted.has(f)) { await unlink(path.join(OUT, f)); console.log(`removed ${f}`); }
  }
  console.log(`${jobs.length - failed.length} of ${jobs.length} icons written to ${path.relative(process.cwd(), OUT)}`);
  if (failed.length) { console.error('Failed:\n  ' + failed.join('\n  ')); process.exit(1); }
}

main();
