import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { parseRss, validateFeed } from './naver-parser.mjs';

const rssUrl='https://rss.blog.naver.com/1986fitness3.xml';
const output=new URL('../data/place-feed.json',import.meta.url);
const response=await fetch(rssUrl,{headers:{'user-agent':'1986-fitness-jungsan-site/1.0'}});
if(!response.ok) throw new Error(`Naver RSS returned ${response.status}`);
const feed=validateFeed(parseRss(await response.text()));
await mkdir(new URL('../assets/live/',import.meta.url),{recursive:true});
for (const [index,item] of feed.news.entries()) {
  if (!item.image) continue;
  const imageResponse=await fetch(item.image,{headers:{referer:'https://blog.naver.com/1986fitness3'}});
  if (!imageResponse.ok) { item.image='assets/images/jungsan-11.jpg'; continue; }
  const relative=`assets/live/naver-${index+1}.jpg`;
  await writeFile(new URL(`../${relative}`,import.meta.url),Buffer.from(await imageResponse.arrayBuffer()));
  item.image=relative;
}
const previous=JSON.parse(await readFile(output,'utf8').catch(()=>'{}'));
const comparable=value=>JSON.stringify({...value,syncedAt:undefined});
if(comparable(previous)!==comparable(feed)){
  const temp=new URL('../data/place-feed.tmp.json',import.meta.url);
  await writeFile(temp,`${JSON.stringify(feed,null,2)}\n`);
  await rename(temp,output);
  console.log(`Updated ${feed.news.length} Naver posts.`);
} else console.log('No content changes.');
