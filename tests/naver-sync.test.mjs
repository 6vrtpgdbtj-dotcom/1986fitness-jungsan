import test from 'node:test';
import assert from 'node:assert/strict';
import { extractFeed, parseRss, validateFeed } from '../scripts/naver-parser.mjs';
import { readFile } from 'node:fs/promises';

const fixture = `
  <article data-feed-card><a href="/place/1052772360/feed/123"><time>2026.09.05</time><h3>가을 운동 이벤트</h3><p>중산점의 새로운 소식입니다.</p><img src="https://example.com/event.jpg"></a></article>
  <img data-owner-photo alt="1986피트니스 중산점" src="https://example.com/gym.jpg">
`;

test('extracts public owner news and photos from a rendered snapshot', () => {
  const feed = extractFeed(fixture, '2026-09-05T00:00:00.000Z');
  assert.equal(feed.news[0].title, '가을 운동 이벤트');
  assert.equal(feed.news[0].url, 'https://m.place.naver.com/place/1052772360/feed/123');
  assert.equal(feed.photos[0].src, 'https://example.com/gym.jpg');
});

test('rejects an empty or blocked synchronization result', () => {
  assert.throws(() => validateFeed({news:[],photos:[]}), /empty/i);
});

test('parses official Naver blog RSS into live cards', () => {
  const xml = `<rss><channel><item><category><![CDATA[이벤트]]></category><title><![CDATA[9월 회원권 안내]]></title><link><![CDATA[https://blog.naver.com/1986fitness3/1]]></link><description><![CDATA[새로운 이벤트 <img src="https://example.com/offer.jpg" />]]></description><pubDate>Sat, 05 Sep 2026 17:44:23 +0900</pubDate></item></channel></rss>`;
  const feed = parseRss(xml, '2026-09-05T00:00:00.000Z');
  assert.equal(feed.news[0].title, '9월 회원권 안내');
  assert.equal(feed.news[0].category, '이벤트');
  assert.equal(feed.news[0].image, 'https://example.com/offer.jpg');
});

test('sync localizes remote thumbnails for GitHub Pages', async () => {
  const source = await readFile(new URL('../scripts/sync-naver.mjs', import.meta.url), 'utf8');
  assert.ok(source.includes('assets/live/naver-'));
  assert.ok(source.includes('arrayBuffer'));
});
