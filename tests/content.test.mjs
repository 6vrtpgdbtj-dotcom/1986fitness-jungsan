import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('page contains the approved sections and verified branch facts', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const id of ['top','reasons','space','members','trainers','visit']) assert.match(html, new RegExp(`id="${id}"`));
  for (const fact of ['오래 다니는 회원','24시간','지상 300평','KEEPAY','박세준','정윤수','이재승','경기 고양시 일산동구 중산로 244']) assert.ok(html.includes(fact), fact);
  assert.match(html, /href="tel:031-977-3690"/);
  assert.doesNotMatch(html, /src="\//);
});

test('renders the hotel-club identity without third-party watermarked media', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /class="brand-mark"/);
  assert.match(html, /The Private Fitness Club/);
  assert.match(html, /중산점 공식 실사/);
  assert.doesNotMatch(html, /assets\/images\/jungsan-/);
  assert.doesNotMatch(html, /da-gym|다짐/i);
});

test('offers an accessible fullscreen viewer for real facility photography', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /<dialog[^>]+id="image-lightbox"/);
  assert.match(html, /class="image-open"/);
  assert.match(html, /aria-label="[^\"]*크게 보기"/);
});
