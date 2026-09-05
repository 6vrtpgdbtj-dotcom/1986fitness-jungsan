# 1986피트니스 중산점 Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a distinctive responsive one-page website for 1986피트니스 중산점 that is ready for GitHub Pages deployment.

**Architecture:** Use semantic static HTML, a focused CSS design system, and dependency-free JavaScript for navigation, gallery, trainer selection, and reveal motion. Store verified branch media locally so the deployed page does not depend on expiring social-media URLs.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-05-jungsan-website-design.md`

## Global Constraints

- Use only verified 1986피트니스 중산점 facts, registered trainers, and public branch media.
- Do not foreground OT, changing prices, or temporary promotions.
- Preserve relative asset paths for GitHub Pages subpath deployment.
- Support keyboard navigation, visible focus, reduced motion, and mobile widths 320/360/390/430px.
- Include one signature composition, one signature component, one orchestrated sequence, and at least three microinteractions.

---

### Task 1: Verified content and local media

**Files:**
- Create: `assets/images/*`
- Create: `assets/media-manifest.json`

**Interfaces:**
- Produces: local image paths and factual metadata consumed by `index.html`.

- [ ] Download only facility and trainer images observed on the branch's Naver Place, Instagram, or Dagym listing.
- [ ] Record `sourceUrl`, `subject`, `usage`, and `checkedAt` for each image in `assets/media-manifest.json`.
- [ ] Confirm the three trainer identities are 박세준, 정윤수, and 이재승 and omit any unverified credentials.
- [ ] Verify every image opens locally and is not a different 1986 branch.
- [ ] Commit with `git add assets && git commit -m "chore: add verified Jungsan media"`.

### Task 2: Semantic page and conversion flow

**Files:**
- Create: `index.html`
- Create: `tests/content.test.mjs`
- Create: `package.json`

**Interfaces:**
- Produces: section IDs `top`, `reasons`, `space`, `members`, `trainers`, `visit`; buttons using `[data-gallery-target]` and `[data-trainer]`.

- [ ] Write a Node test that asserts the six section IDs, three verified trainer names, the main message, address, phone link, and relative asset paths exist.
- [ ] Run `node --test tests/content.test.mjs` and confirm it fails because `index.html` does not exist.
- [ ] Build semantic HTML with skip link, header/navigation, hero, evidence track, facility gallery, member experience, trainer selector, visit section, and footer.
- [ ] Use `오래 다니는 데는, 분위기가 이유가 됩니다.` as the hero and support it with 24시간, 지상 300평, 중산동 최장 운영, and KEEPAY 가입.
- [ ] Run `node --test tests/content.test.mjs` and confirm it passes.
- [ ] Commit with `git add index.html package.json tests/content.test.mjs && git commit -m "feat: add Jungsan page content"`.

### Task 3: Responsive visual system

**Files:**
- Create: `styles.css`
- Modify: `index.html`
- Create: `tests/styles.test.mjs`

**Interfaces:**
- Consumes: section IDs and component hooks from Task 2.
- Produces: CSS tokens, asymmetric hero, STAY REASONS track, responsive gallery, trainer states.

- [ ] Write tests for required tokens, breakpoints, focus-visible rules, and reduced-motion handling.
- [ ] Run `node --test tests/styles.test.mjs` and confirm it fails before `styles.css` exists.
- [ ] Implement the warm ivory, charcoal, olive, and orange token system and editorial 12-column desktop layout.
- [ ] Implement the `LONG STAY / 24 HOURS` hero rail and non-uniform image composition.
- [ ] Transform the gallery into a horizontal snap track and trainers into compact selectors below 720px.
- [ ] Add visible keyboard focus, safe Korean wrapping, and `prefers-reduced-motion` final states.
- [ ] Run `node --test tests/styles.test.mjs` and confirm it passes.
- [ ] Commit with `git add index.html styles.css tests/styles.test.mjs && git commit -m "feat: style responsive Jungsan experience"`.

### Task 4: Interaction and motion

**Files:**
- Create: `script.js`
- Modify: `index.html`
- Create: `tests/interaction.test.mjs`

**Interfaces:**
- Consumes: `[data-gallery-target]`, `[data-trainer]`, `[data-reveal]`.
- Produces: `selectGalleryItem(index)`, `selectTrainer(index)`, `initRevealObserver()`.

- [ ] Write source-level tests for the three public functions, ARIA state updates, and reduced-motion guard.
- [ ] Run `node --test tests/interaction.test.mjs` and confirm it fails before `script.js` exists.
- [ ] Implement the hero assembly sequence and one consistent scroll-reveal grammar.
- [ ] Implement keyboard-operable gallery and trainer selection with `aria-selected` updates.
- [ ] Add navigation hover/focus, gallery selection, trainer selection, and CTA press microinteractions.
- [ ] Run all tests with `npm test` and confirm they pass.
- [ ] Commit with `git add index.html script.js tests/interaction.test.mjs && git commit -m "feat: add accessible site interactions"`.

### Task 5: GitHub Pages and visual verification

**Files:**
- Create: `.nojekyll`
- Create: `README.md`
- Modify: `DESIGN_BRIEF.md`

**Interfaces:**
- Consumes: completed static site.
- Produces: deployable repository and verification evidence.

- [ ] Document local preview with `python -m http.server 8080` and GitHub Pages deployment from the repository root.
- [ ] Start the local server and inspect the normal desktop first viewport and full page.
- [ ] Inspect 320, 360, 390, and 430px widths for horizontal overflow, clipping, crop, and CTA visibility.
- [ ] Exercise gallery, trainer selection, navigation, and reduced-motion behavior with keyboard and pointer.
- [ ] Check console errors, broken media, all external links, and relative asset resolution.
- [ ] Capture desktop, 390px mobile, and sequential motion evidence; record paths in `DESIGN_BRIEF.md`.
- [ ] Run `npm test` and a link/asset validation pass; require exit code 0.
- [ ] Commit with `git add .nojekyll README.md DESIGN_BRIEF.md && git commit -m "docs: add deployment and verification evidence"`.
