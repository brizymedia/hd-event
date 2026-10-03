# HD기획 홈페이지

큰길브리지 계약 KB-20260906-273 (기업형, 2026-09-06 체결) 납품물.
서버 없이 정적 파일만으로 돌아갑니다. 벤치마킹: 나인엠씨(구조 · 구성) + 프로이벤트 리뉴얼(사진 · 영상).

```
index.html          대문 한 장 (히어로 슬라이더 → 가치 4탭 → 바로가기 3장 → 회사소개 → 사업분야 8 → 프로세스 5
                    → 갤러리 9장 → 현장 영상 + 행사 정보 → 콘텐츠 3타일 → 후기 → 공지 · 안내 → 견적 문의 → 푸터)
portfolio.html      포트폴리오 전체 19장 (필터 · 라이트박스)
assets/style.css    스타일 (화이트 톤, 포인트 #F0472B)
assets/app.js       스크립트 (슬라이더 · 탭 · 갤러리 · 영상 · 공지 · 문의 폼) — 공지 · 포트폴리오 목록도 여기
assets/img/         사진 (프로이벤트 리뉴얼에서 가져옴: works 19 · biz 8 · sys 16 · slider 5 · hero_poster)
assets/video/       현장 스케치 영상 hero_md.mp4(720p) · hero_sm.mp4(폰)
```

## 보기

```
npx -y http-server C:/Users/gilau/Documents/hd-event -p 8178 -c-1
```
→ http://localhost:8178 (`file://` 로 열면 영상 · 글꼴이 안 나옵니다)

## 회사 정보 (계약서 · 주문서 기준)

- 상호 HD기획 · 대표 엄원식 · 개인사업자
- 서울시 금천구 시흥대로26길 69-24 · 010-3401-0118 · 16zone@hanmail.net
- 운영 지역: 서울 · 광명 · 남양주 · 도메인 없음(새로 잡아야 함)

## 납품 전에 꼭 확인할 것 (엄원식 대표에게 물어볼 것)

1. **사진 워터마크.** `assets/img/works/`(포트폴리오 19장)와 `biz/` 일부에 「CREATIVE PLAN PROEVENT」 워터마크가 찍혀 있다.
   대문 히어로 · 사업분야 · 타일은 워터마크 없는 `sys/` · `slider*` · `hero_poster` 만 골라 썼다.
   갤러리 · 포트폴리오는 HD기획 자체 사진으로 바꾸는 게 맞다. 바꿀 땐 `app.js` 의 `WORKS` 배열(사진 번호 ↔ 제목)을 같이 고친다.
2. **숫자.** 회사소개의 「20,000명 운영 경험」은 프로이벤트 사진 기준 표현이다. HD기획 실적으로 바꾸거나 뺀다(`index.html` `.stats`).
3. **후기 4개**는 구조를 보여 주는 예시 문구다. 실제 후기로 바꾸기 전엔 공개하지 말 것(`index.html` `#review`).
4. **공지사항**은 `app.js` 맨 위 `NOTICES` 배열. 날짜 · 제목만 적으면 대문에 뜬다.
5. **사업자등록번호**가 없어 푸터에 안 넣었다. 받으면 푸터 COMPANY 줄에 추가.
6. **영상**은 프로이벤트 현장 몽타주(워터마크 포함)다. HD기획 영상이 생기면 `assets/video/` 교체.

## 오픈할 때 바꿀 것

1. ~~noindex 지우기~~ — 2026-09-26 검색 공개 (github.io 주소로 canonical · sitemap · robots 설정). 도메인을 연결하면 canonical · og · sitemap 주소를 새 도메인으로 바꿀 것.
2. `assets/app.js` 맨 위 `FORM_ENDPOINT` 에 문의 접수 서버(Apps Script) 주소 넣기.
   비어 있으면 폰에서는 문자 앱(010-3401-0118)이 열리고, PC 에서는 내용을 복사해 준 뒤 전화를 안내한다.
3. `og:image` 를 실제 주소(https://도메인/assets/img/hero_poster.webp)로.
4. 도메인 연결 뒤 사이트맵 · 네이버 서치어드바이저 · 구글 서치콘솔 등록.

## 업무 도구 (2026-10-03, 바로기획 기준본을 옮김 — `tools/port_docs.py` · `tools/make_pages.py`)

| 기능 | 주소 | 서버 |
|---|---|---|
| 자동 견적서(손님용) | `quote.html` | 문의 서버(공용) |
| 견적서 발행 · 저장함(관리자) | `quote.html?admin=1` | 저장함 폰 · PC 같이 보기는 계약 서버 |
| 전자계약서 | `contract.html?admin=1` | 계약 서버(`apps-script/contract`) — 배포 전 |
| 거래명세서 | `statement.html?admin=1` | 없음 |
| 행사 일정 · 체크리스트 | `schedule.html` | 계약 서버 |
| 사진 올리기 + 블로그 · 인스타 글 | `upload.html` | 갤러리 서버(`apps-script/gallery`) → `photos` 가지 → 포트폴리오 페이지 — 배포 전 |
| 대표 전용 업무 문서함 | `office.html` (공개 링크 없음) | — |
| 행사 이야기 · 지역 페이지 | `stories/` · `areas/` | 없음 — `python tools/make_pages.py` |
| 문의 알림 | 대문 견적 문의 폼 · 견적서 | 문의 서버(공용) → 대표 메일 + 큰길브리지 |
| 유입 현황 · AI 검색 | `stats.js`(data-site="hd") · `llms.txt` · `sitemap.xml` · `robots.txt` | 큰길브리지 유입 서버 |

- 서류 화면은 큰길이벤트 원본에서 `python tools/port_docs.py` 로 옮긴다. 결과 HTML 을 손으로 고치지 말고 스크립트의 「회사 설정」을 고친 뒤 다시 돌릴 것.
- 서버 2개를 배포하면 `port_docs.py` 의 `CONTRACT_URL` · `GALLERY_URL` 에 주소를 넣고 다시 돌린다. 사업자등록번호를 받으면 `BIZNO` 도.
- 직인: `assets/img/stamp-hd.png`(투명 PNG)가 생기면 계약서 · 명세서에 찍힌다. 없으면 「(인)」 자리만.
- 행사 이야기 5편은 포트폴리오 목록(제목 · 분야 · 연도)만 근거로 썼다. 포트폴리오가 HD기획 사진 · 실적으로 바뀌면 `make_pages.py` 의 `STORIES` 도 같이 바꿀 것.
