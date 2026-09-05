import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('styles define brand tokens, mobile transformation, focus, and reduced motion', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  for (const token of ['--ink','--paper','--orange','--olive']) assert.ok(css.includes(token), token);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /scroll-snap-type/);
  assert.match(css, /scrollbar-width:\s*none/);
});
