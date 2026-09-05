const PLACE_ORIGIN = 'https://m.place.naver.com';
const stripTags = (value = '') => value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const attr = (html, name) => html.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1] || '';

export function extractFeed(html, syncedAt = new Date().toISOString()) {
  const news = [...html.matchAll(/<article[^>]*data-feed-card[^>]*>([\s\S]*?)<\/article>/gi)].map((match) => {
    const block = match[1];
    const href = attr(block, 'href');
    return {title:stripTags(block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1]),summary:stripTags(block.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]),date:stripTags(block.match(/<time[^>]*>([\s\S]*?)<\/time>/i)?.[1]),image:attr(block.match(/<img[^>]*>/i)?.[0] || '', 'src'),url:new URL(href,PLACE_ORIGIN).href};
  }).filter((item) => item.title);
  const photos = [...html.matchAll(/<img[^>]*data-owner-photo[^>]*>/gi)].map((match) => ({src:attr(match[0],'src'),alt:attr(match[0],'alt') || '1986피트니스 중산점'})).filter((item) => item.src);
  return {placeId:'1052772360',syncedAt,news:news.slice(0,4),photos:photos.slice(0,8)};
}

export function validateFeed(feed) {
  if (!Array.isArray(feed.news) || !Array.isArray(feed.photos)) throw new Error('Invalid feed schema');
  if (feed.news.length + feed.photos.length === 0) throw new Error('Empty synchronization result');
  return feed;
}

const cdata = (block, tag) => block.match(new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i'))?.[1]?.trim() || block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i'))?.[1]?.trim() || '';

export function parseRss(xml, syncedAt = new Date().toISOString()) {
  const news = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => {
    const block = match[1];
    const description = cdata(block, 'description');
    const image = description.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] || '';
    return {title:cdata(block,'title'),category:cdata(block,'category'),summary:stripTags(description).replace(/\.{5,}.*/, '').slice(0,150),date:cdata(block,'pubDate'),image,url:cdata(block,'link')};
  }).filter((item) => item.title && item.url).slice(0,4);
  return {placeId:'1052772360',source:'https://rss.blog.naver.com/1986fitness3.xml',syncedAt,news,photos:[]};
}
