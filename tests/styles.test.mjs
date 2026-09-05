import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('styles define brand tokens, mobile transformation, focus, and reduced motion', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  for (const token of ['--ink','--paper','--gold','--serif']) assert.ok(css.includes(token), token);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /scroll-snap-type/);
  assert.match(css, /scrollbar-width:\s*none/);
});

test('hotel-club visual system provides serif display type and cinematic media treatment', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /--serif:/);
  assert.match(css, /--gold:/);
  assert.match(css, /\.hero-ambient/);
  assert.match(css, /\.club-letter/);
  assert.match(css, /@media \(max-width:720px\)/);
});
