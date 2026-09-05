# Naver Place Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reflect public Naver Place news and owner photos on the static site through hourly cached synchronization.

**Architecture:** A Playwright script parses public Place pages and atomically writes a static JSON cache. GitHub Actions runs it hourly and commits only valid changed data; the browser UI renders the cache with a permanent fallback.

**Tech Stack:** Node.js, Playwright, GitHub Actions, vanilla JavaScript

**Spec:** `docs/superpowers/specs/2026-09-05-naver-place-sync-design.md`

## Global Constraints

- Read-only access to public Naver Place pages.
- Never replace a valid cache with empty or blocked results.
- No credentials or secrets.
- Maximum four live cards and a direct Place link.

### Task 1: Parser and cache

**Files:** Create `scripts/naver-parser.mjs`, `scripts/sync-naver.mjs`, `data/place-feed.json`; modify `package.json`; test `tests/naver-sync.test.mjs`.

- [ ] Write fixture-based failing tests for news/photo parsing and empty-result rejection.
- [ ] Implement pure extraction and validation functions.
- [ ] Implement Playwright navigation and atomic JSON write.
- [ ] Run parser tests and one live dry run.

### Task 2: Live site section

**Files:** Modify `index.html`, `styles.css`, `script.js`; test `tests/interaction.test.mjs`.

- [ ] Write failing assertions for live section hooks and loading/error handling.
- [ ] Add the `LIVE FROM NAVER` section with static fallback.
- [ ] Fetch and render cached JSON without layout shift.
- [ ] Verify normal and missing-JSON states.

### Task 3: Scheduled workflow

**Files:** Create `.github/workflows/sync-naver-place.yml`; modify `README.md`.

- [ ] Add hourly and manual triggers with contents write permission.
- [ ] Install Playwright Chromium, run sync, validate JSON, and commit changed cache.
- [ ] Document the delay, failure behavior, and manual run procedure.
- [ ] Run the complete local test suite.
