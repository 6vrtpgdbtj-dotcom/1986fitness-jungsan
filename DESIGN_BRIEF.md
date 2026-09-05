# Design Brief

## Product job
중산동 운동 입문자와 장기 이용 희망자가 실제 공간과 이용 분위기를 확인하고 상담 또는 방문을 결정한다.

## Direction
따뜻한 에디토리얼 화면 안에서 오래 다니게 만드는 사람·청결·공간을 큰 실제 사진과 리뷰 근거로 증명한다.

## Brand reading
- Immutable identity: 1986 FITNESS, 중산점, 24시간, 짙은 중성색과 주황 포인트.
- Repeatable shapes/materials: 직선, 큰 숫자, 밝은 콘크리트, 컬러 유리, 넓은 동선.
- Existing inconsistencies to remove: 가격 전단형 이미지의 과밀한 문구와 과도한 둥근 캡슐.
- Media provenance: 다짐 중산점 공개 시설 사진과 등록 트레이너 사진, 2026-09-05 확인.

## Reference synthesis
- Structure comes from: 원흥점의 문제-철학-증거-방문 순서.
- Interaction comes from: 가양점의 선택형 시설·트레이너 탐색.
- Visual tone comes from: 중산점 실제 시설의 밝은 회색과 무지갯빛 유리.
- Hook/copy energy comes from: 실제 리뷰의 편안함, 재등록, 오래 이용하는 행동.
- Motion/media behavior comes from: 선택한 사진을 중심으로 주변 정보가 따라 바뀌는 갤러리.
- The final screen will not copy: 레퍼런스의 문구, 지점 사진, 전체 배치, 고유 장식.

## Reference evidence
- Exact page/section/state inspected: 원흥점 전체 페이지, 가양점 hero·space·trainers, 중산점 네이버 리뷰 및 다짐 사진·트레이너 영역.
- Desktop/mobile behavior observed: 1280px 데스크톱 구조와 앵커 이동, 선택형 트레이너 콘텐츠를 확인했다.

## Reference implementation map
| Reference evidence | Extracted principle | Local component | Motion/state | Mobile translation | Acceptance evidence |
|---|---|---|---|---|---|
| 원흥점 hero/why | 큰 문장 뒤에 세 가지 근거 | `.hero`, `.hero-proof` | 순차 조립 | 이미지 아래 증거 레일 | desktop/mobile capture |
| 가양점 space | 선택 가능한 실제 공간 | `.space-viewer` | 선택 이미지 교체 | 가로 스냅 썸네일 | interaction test |
| 가양점 trainers | 인물 선택 후 상세 표시 | `.trainer-stage` | aria-selected 전환 | 세로 카드+탭 | keyboard test |
| 중산점 리뷰 | 반복 키워드와 장기 이용 맥락 | `.stay-track` | 수치선 reveal | 축약된 2열 | desktop/mobile capture |

## Signature composition and component
- Signature composition: LONG STAY 세로 레일과 24 HOURS 숫자가 실제 시설 사진에 걸치는 비대칭 hero.
- Signature component: 네이버 리뷰 키워드를 규모순 선으로 보여주고 실제 장기 이용 맥락을 연결하는 STAY REASONS.

## Motion storyboard
| Beat | Trigger | Elements | From → to | Duration/ease | Purpose | Reduced motion |
|---|---|---|---|---|---|---|
| Assemble trust | load | eyebrow, title, media, proof | y/clip → final | 700ms ease-out stagger | 브랜드와 근거 조립 | final state |
| Reveal proof | viewport | heading, bars, quote | y/scaleX → final | 550ms ease-out | 리뷰 근거 읽기 | final state |
| Explore space | click/key | image, caption, tab | opacity → selected | 260ms ease | 공간 비교 | instant |
| Meet coaches | click/key | trainer detail | opacity/y → final | 240ms ease | 전문 분야 확인 | instant |
| CTA feedback | hover/focus | arrow, background | x/color | 180ms ease | 행동 가능성 표시 | color only |

## References
| Role | Source | Adapt | Do not copy |
|---|---|---|---|
| Structure | https://1986fitnessk.github.io/ | 긴 호흡의 증거 순서 | 원흥점 문구와 사진 |
| Interaction | https://junh1415-lab.github.io/1986fitness-gayang/#trainers | 선택형 시설·인물 탐색 | 가양점 스타일과 인물 |
| Proof/media | https://m.place.naver.com/place/1052772360/review/visitor / https://www.da-gym.co.kr/detail/647077d70298d1001d1ecb5a | 실제 리뷰 키워드와 중산점 사진 | 가격 프로모션 전단 구성 |

## Tokens
- Font: Arial, Pretendard, Noto Sans KR, sans-serif; 좁고 단단한 대문자 라벨.
- Text colors: #181914, #66675e, #f5f3ea.
- Surface colors: #f2f0e7, #deddd4, #1c201b.
- Accent and semantic colors: #f1692b orange, #67734f olive, #2f6b53 safe.
- Spacing steps: 4, 8, 12, 20, 32, 56, 88, 132px.
- Radius: 0, 4, 8px.
- Border and shadow: 1px solid currentColor/18%; 사진에만 약한 shadow.
- Motion: 180–700ms, cubic-bezier(.2,.7,.2,1), 하나의 reveal grammar.

## Screen priorities
1. 오래 다니는 분위기와 상담 행동.
2. 실제 리뷰 근거와 넓고 정돈된 공간.
3. 확인된 트레이너와 방문 정보.

## Behavior that must remain unchanged
- 외부 상담·지도 링크는 실제 서비스로 이동한다.

## Anti-template decisions
- Generic pattern being rejected: 같은 크기의 흰 카드와 가격 중심 헬스장 랜딩.
- Project-specific replacement: LONG STAY 세로 레일, 리뷰 비례 트랙, 중산점 컬러 유리에서 가져온 얇은 스펙트럼 선.

## Responsive and motion contract
- Desktop media behavior: 12열 비대칭 hero와 큰 16:10 공간 프레임.
- Mobile media behavior: hero 사진을 제목 다음으로 이동하고 갤러리를 스냅 트랙으로 전환.
- Scroll reveal grammar: 제목 → 근거 → 이미지 순으로 70ms stagger.
- Reduced-motion fallback: 모든 요소 즉시 최종 위치, 자동 스크롤 없음.
- Text-clipping viewports: 320, 360, 390, 430px.

## Verification captures
- Desktop first viewport: `docs/qa/desktop-hero.png`, 1440×900에서 CTA와 실제 시설 사진 확인.
- Desktop representative flow: 브라우저에서 reasons, space, members, trainers, visit 순서와 이미지 로딩 확인.
- 390px first viewport and transformed component: `docs/qa/mobile-390-hero.png`; CTA가 첫 화면 안에 있고 가로 페이지 오버플로 없음.
- Motion evidence: hero의 5단계 조립, IntersectionObserver reveal, 시설 선택 이미지 전환을 브라우저에서 순차 확인.
- Naver live content: `docs/qa/naver-live-feed.png`; 공개 RSS 4건과 로컬 저장 대표 이미지 렌더링 확인.
