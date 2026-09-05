import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('script exposes accessible gallery, trainer and reveal behaviors', async () => {
  const js = await readFile(new URL('../script.js', import.meta.url), 'utf8');
  for (const fn of ['selectGalleryItem','selectTrainer','initRevealObserver']) assert.match(js, new RegExp(`function ${fn}\\(`));
  assert.ok(js.includes("setAttribute('aria-selected'"));
  assert.ok(js.includes('prefers-reduced-motion'));
  assert.ok(js.includes("addEventListener('keydown'"));
  assert.ok(js.includes('loadNaverFeed'));
  assert.ok(js.includes('place-feed-status'));
});

test('script opens and closes the fullscreen image dialog', async () => {
  const js = await readFile(new URL('../script.js', import.meta.url), 'utf8');
  assert.match(js, /image-lightbox/);
  assert.match(js, /showModal\(\)/);
  assert.match(js, /\.close\(\)/);
  assert.doesNotMatch(js, /assets\/images\//);
});
