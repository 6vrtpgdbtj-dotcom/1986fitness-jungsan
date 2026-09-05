const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function selectGalleryItem(index) {
  const tabs = [...document.querySelectorAll('[data-gallery-target]')];
  const tab = tabs[index];
  if (!tab) return;
  tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
  const image = document.querySelector('#space-image');
  image.style.opacity = '0';
  const update = () => {
    image.src = tab.dataset.src;
    image.alt = tab.dataset.alt;
    document.querySelector('#space-number').textContent = String(index + 1).padStart(2, '0');
    document.querySelector('#space-title').textContent = tab.dataset.title;
    document.querySelector('#space-copy').textContent = tab.dataset.copy;
    image.style.opacity = '1';
  };
  reduceMotion.matches ? update() : window.setTimeout(update, 150);
}

function selectTrainer(index) {
  const tabs = [...document.querySelectorAll('[data-trainer]')];
  const tab = tabs[index];
  if (!tab) return;
  tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
  document.querySelector('#trainer-count').textContent = `${String(index + 1).padStart(2, '0')} / 03`;
  document.querySelector('#trainer-name').textContent = tab.dataset.name;
  document.querySelector('#trainer-focus').textContent = tab.dataset.focus;
  const link = document.querySelector('#trainer-link');
  link.firstChild.textContent = `${tab.dataset.name} 트레이너 상담 `;
  const image = document.querySelector('#trainer-image');
  if (tab.dataset.image) {
    image.src = tab.dataset.image;
    image.alt = `${tab.dataset.name} 트레이너`;
    image.style.opacity = '1';
    const openButton = document.querySelector('#trainer-image-open');
    if (openButton) openButton.setAttribute('aria-label', `${tab.dataset.name} 트레이너 사진 크게 보기`);
  } else {
    image.removeAttribute('src');
    image.alt = '';
    image.style.opacity = '0';
  }
}

function initImageLightbox() {
  const dialog = document.querySelector('#image-lightbox');
  const output = document.querySelector('#lightbox-image');
  if (!dialog || !output) return;

  document.querySelectorAll('.image-open').forEach((button) => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      if (!source?.src) return;
      output.src = source.currentSrc || source.src;
      output.alt = source.alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function initRevealObserver() {
  const items = document.querySelectorAll('[data-reveal]');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .14 });
  items.forEach((item) => observer.observe(item));
}

function bindTabs(selector, select) {
  const tabs = [...document.querySelectorAll(selector)];
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
      const next = (index + direction + tabs.length) % tabs.length;
      tabs[next].focus();
      select(next);
    });
  });
}

function feedCard(item, index) {
  const link = document.createElement('a');
  link.href = item.url || 'https://m.place.naver.com/place/1052772360/photo';
  link.target = '_blank';
  link.rel = 'noopener';
  const image = document.createElement('img');
  image.src = item.image || item.src;
  image.alt = item.alt || item.title || '1986피트니스 중산점 최신 사진';
  image.loading = 'lazy';
  const label = document.createElement('span');
  label.textContent = item.date || `PLACE PHOTO ${String(index + 1).padStart(2, '0')}`;
  const title = document.createElement('h3');
  title.textContent = item.title || '중산점의 새로운 공간 사진';
  const copy = document.createElement('p');
  copy.textContent = item.summary || '네이버 플레이스에서 크게 보기 ↗';
  link.append(image, label, title, copy);
  return link;
}

async function loadNaverFeed() {
  const status = document.querySelector('#place-feed-status');
  const grid = document.querySelector('#place-feed-grid');
  if (!status || !grid) return;
  try {
    const response = await fetch('data/place-feed.json', {cache:'no-cache'});
    if (!response.ok) throw new Error('feed unavailable');
    const feed = await response.json();
    const items = feed.news.length ? feed.news : feed.photos;
    if (!items.length) throw new Error('feed empty');
    grid.replaceChildren(...items.slice(0,4).map(feedCard));
    const synced = new Date(feed.syncedAt);
    status.textContent = `네이버 공식 채널 자동 동기화 · ${synced.toLocaleDateString('ko-KR')}`;
  } catch (error) {
    status.textContent = '마지막 확인 콘텐츠입니다. 최신 소식은 네이버 플레이스에서 확인해주세요.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  bindTabs('[data-gallery-target]', selectGalleryItem);
  bindTabs('[data-trainer]', selectTrainer);
  initRevealObserver();
  initImageLightbox();
  loadNaverFeed();
});
