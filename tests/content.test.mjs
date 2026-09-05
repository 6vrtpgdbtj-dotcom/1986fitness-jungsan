import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('page contains the approved sections and verified branch facts', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const id of ['top','reasons','space','members','trainers','visit']) assert.match(html, new RegExp(`id="${id}"`));
  for (const fact of ['오래 다니는 데는,','24시간','지상 300평','KEEPAY','박세준','정윤수','이재승','경기 고양시 일산동구 중산로 244']) assert.ok(html.includes(fact), fact);
  assert.match(html, /href="tel:031-977-3690"/);
  assert.doesNotMatch(html, /src="\//);
});
