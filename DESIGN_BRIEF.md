# Design Brief

## Product job
중산동에서 장기간 다닐 운동 공간을 찾는 방문자가 실제 중산점 공간과 운영 신뢰를 확인하고 방문 상담을 결정한다.

## Direction
하이엔드 호텔의 조용한 환대와 피트니스 클럽의 물성을 결합한 풀블리드 실사·세리프 타이포 중심의 느리고 절제된 단일 페이지.

## Brand reading
- Immutable identity: 공식 1986 기하학 심볼, 중산점, 24시간, 지상 300평, 중산동 최장 운영, KEEPAY.
- Repeatable shapes/materials: 공식 심볼의 직각선, 거울, 금속, 유리, 길게 뻗은 조명.
- Existing inconsistencies to remove: 주황·올리브 혼합, 리뷰 순위 막대, 전단형 카드, 워터마크 사진.
- Media provenance: 1986 법인 공식 홈페이지의 심볼과 중산점 공식 당근 업체 페이지의 실사. 외부 플랫폼 워터마크 이미지는 사용하지 않는다.

## Reference synthesis
- Structure comes from: Aman 홈페이지의 한 장면-한 메시지 흐름과 넉넉한 여백.
- Interaction comes from: 기존 중산점 페이지의 키보드 가능한 탭과 실제 상담 링크.
- Visual tone comes from: Equinox Hotels의 어두운 풀블리드 미디어와 performance luxury 대비.
- Hook/copy energy comes from: 중산점의 장기회원과 최장 운영이라는 검증된 운영 맥락.
- Motion/media behavior comes from: 호텔 사이트의 느린 이미지 스케일과 정교한 텍스트 조립.
- The final screen will not copy: 레퍼런스의 로고, 문구, 영상, 사진, 전체 배치.

## Reference evidence
- Exact page/section/state inspected: 1986 법인 소개 헤더 심볼, Aman 홈 히어로와 destinations, Equinox Hotels 홈 히어로와 Our Brand, 중산점 당근 업체 사진 0~5.
- Desktop/mobile behavior observed: 대형 미디어 위 얇은 내비게이션, 짧은 CTA, 한 섹션당 하나의 큰 문장과 이미지 중심 서사.

## Reference implementation map
| Reference evidence | Extracted principle | Local component | Motion/state | Mobile translation | Acceptance evidence |
|---|---|---|---|---|---|
| Aman home hero | 미디어 한 장과 짧은 약속 | `.hero`, `index.html` | 로고-카피-CTA 순차 조립 | 실사 비중을 높이고 카피를 하단 배치 | desktop/mobile hero capture |
| Equinox Hotels hero | luxury와 performance의 긴장 | `.club-letter`, `.proof-suite` | 스크롤 시 문자와 수치 reveal | 큰 문자 일부를 배경 레이어로 전환 | 390px screenshot |
| 1986 공식 심볼 | 직각 기하학을 브랜드 문법으로 반복 | `.brand-mark`, `.angle-line` | hover/focus 선 이동 | 심볼 크기 축소, 이름 유지 | computed image and focus check |
| 중산점 공식 당근 실사 | 실제 시설을 대표 증거로 사용 | `.hero-ambient`, `.space-portrait` | 느린 scale, 탭 crop 전환 | 세로 원본 비율을 보존 | currentSrc and provenance check |

## Signature composition and component
- Signature composition: 세로형 중산점 실사가 오른쪽 42%를 차지하고 왼쪽의 대형 세리프 문장과 겹치는 호텔 로비형 hero.
- Signature component: CLUB 1986 대형 문자 사이에 최장 운영·300평·24시간·KEEPAY가 객실 사양처럼 정렬되는 proof suite.

## Motion storyboard
| Beat | Trigger | Elements | From → to | Duration/ease | Purpose | Reduced motion |
|---|---|---|---|---|---|---|
| Enter the club | load | 심볼, eyebrow, title, photo veil, CTA | opacity/y/scale → final | 900ms ease-out stagger | 조용한 첫 인상 조립 | final state |
| Reveal the suite | viewport | CLUB 문자, 사양 라인 | y/clip → final | 700ms ease-out | 핵심 근거를 하나의 공간처럼 제시 | final state |
| Browse real space | click/key | 실사 crop, caption | opacity → selected | 300ms ease | 공식 실사 탐색 | instant |
| Service feedback | hover/focus | link underline, arrow, image scale | x/scale/color | 220ms ease | 행동 가능성 전달 | color only |

## References
| Role | Source | Adapt | Do not copy |
|---|---|---|---|
| Brand | https://1986corporation.co.kr/16 | 공식 기하학 심볼 | 법인 페이지 레이아웃 |
| Structure/visual | https://www.aman.com/ | 한 장면-한 메시지, 정제된 여백 | Aman 카피·사진·로고 |
| Visual/hook | https://equinox-hotels.com/ | 어두운 미디어와 performance luxury 대비 | Equinox 트레이드 드레스 |
| Real media | https://www.daangn.com/kr/local-profile/1986피트니스-중산점-g15i28fh91y6/ | 중산점 공식 등록 실사 | 당근 UI와 프로모션 그래픽 |

## Tokens
- Font: Cormorant Garamond 500/600 for editorial English and key numerals; Pretendard Variable 400/500/600 for Korean because its quiet neutral shapes support hotel-like service copy.
- Text colors: #f0ece3, #c8c1b5, #151513.
- Surface colors: #0b0c0b, #141512, #eee9df.
- Accent and semantic colors: #b69a68 muted gold, #667061 KEEPAY green.
- Spacing steps: 6, 12, 18, 28, 44, 72, 112, 160px.
- Radius: 0px; 사진 프레임만 2px.
- Border and shadow: 1px solid rgba(240,236,227,.22); shadow 대신 그라데이션과 재료 대비.
- Motion: 220–900ms, cubic-bezier(.22,.61,.36,1), 한 방향의 reveal grammar.

## Screen priorities
1. 실제 중산점이라는 확신과 오래 머물 수 있는 분위기.
2. 최장 운영·지상 300평·24시간·KEEPAY의 신뢰.
3. 세 명의 실제 트레이너와 방문 상담.

## Behavior that must remain unchanged
- 네이버 상담, 전화, 톡톡, 인스타그램 링크와 자동 소식 피드는 유지한다.
- 세 트레이너 이름과 공개 전문 분야를 유지한다.

## Anti-template decisions
- Generic pattern being rejected: 같은 크기 카드, 밝은 SaaS형 섹션, 순위 막대, 형광 피트니스 광고.
- Project-specific replacement: 공식 심볼 직각선, 세로 중산점 실사, 객실 사양처럼 정렬된 CLUB 1986 proof suite.

## Responsive and motion contract
- Desktop media behavior: 오른쪽 42% 세로 실사, 왼쪽 copy-safe zone, 사진은 중심 기구를 유지한다.
- Mobile media behavior: 카피 뒤에 세로 실사를 58svh로 배치하고 CLUB 문자를 배경 숫자로 전환한다.
- Scroll reveal grammar: 작은 라벨 → 큰 제목 → 증거선 순으로 90ms stagger.
- Reduced-motion fallback: 모든 요소 즉시 최종 위치, scale과 smooth scroll 제거.
- Text-clipping viewports: 320, 360, 390, 430px.

## Verification captures
- Desktop first viewport: `docs/qa/hotel-desktop-hero.png`.
- Mobile first viewport: `docs/qa/hotel-mobile-390.png`.
- Representative flow: `docs/qa/hotel-space.png`.
- Motion evidence: hero stagger, slow media settle, viewport reveal, tab and CTA transitions verified in browser.
