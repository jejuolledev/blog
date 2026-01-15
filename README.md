# jejuolledev/blog

제주에서 개발하며 기록하는 개인 블로그입니다. 미니멀한 타이포 중심 레이아웃과 빠른 로딩을 목표로 합니다.

## 기술 스택
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Contentlayer + MDX
- Fuse.js (로컬 검색)

## 로컬 실행 방법
```bash
npm install
npm run dev
```
- 로컬 확인 URL: `http://localhost:3000`

## 빌드/배포
```bash
npm run build
npm run start
```

## 콘텐츠 구조
- `content/posts/*.mdx`
- frontmatter: `title`, `date`, `description`, `tags`, `draft`, `cover`, `canonical`

## 단계별 구현 체크리스트

### (a) 프로젝트 부트스트랩/의존성
- [x] Next.js + TypeScript + Tailwind 기반 구성
- [x] Contentlayer/MDX 의존성 추가
- [x] 기본 스크립트 정리

### (b) 레이아웃/테마/타이포
- [x] 글로벌 레이아웃 및 네비게이션 구성
- [x] 다크 모드 + 토글
- [x] 타이포그래피 가이드 (line-height, max-width)

### (c) MDX 파이프라인 + 글 목록/상세
- [x] `/content/posts/*.mdx` 구조
- [x] 글 목록/상세 페이지
- [x] 코드 하이라이트 + TOC + 이전/다음 글

### (d) 태그/검색/RSS/sitemap
- [x] 태그 목록/상세 페이지
- [x] Fuse.js 기반 로컬 검색
- [x] RSS, sitemap.xml, robots.txt

### (e) SEO/OG 이미지 + 성능 튜닝
- [x] OG 이미지 생성 라우트
- [x] 기본 메타데이터/오픈그래프 설정
- [x] Tailwind 기반 최소 스타일로 CLS 최소화

## 확인 체크리스트
- [ ] `npm run dev` 실행 후 홈, 글 목록, 글 상세 확인
- [ ] 다크모드 토글 동작 확인
- [ ] `/rss.xml`, `/sitemap.xml`, `/robots.txt` 응답 확인
- [ ] 검색 인풋에서 결과 출력 확인

## Analytics
원하는 경우 Vercel Analytics 또는 Plausible를 추가할 수 있습니다. (현재는 주석 처리/비활성)
