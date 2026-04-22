# iamlazyck-blog

`iamlazyck.kr` 의 소스. 리서치 회사 IT nerd 의 공개 노트. AI·자동화·vibe coding·1인 기업 준비 + 일상 사진.

## 콘텐츠 소스 두 개

1. **posts** — Notion DB 의 `MyThought` 필드에 내가 쓴 생각이 시드. 1시간마다 돌아가는 Vercel Cron 이 persona 프롬프트로 확장해 `content/posts/*.md` 에 커밋.
2. **diary** — Telegram 봇이 받은 사진을 Vercel Blob 에 올리고, 짧은 캡션을 입힌 뒤 `content/diary/*.md` 에 커밋.

두 파이프라인 모두 [`CONTENT_RULES.md`](./CONTENT_RULES.md) 를 따른다. 이 문서가 모든 생성의 진실의 근원.

## 스택

- Next.js 15 App Router
- React 19
- gray-matter + react-markdown + remark-gfm
- TypeScript
- Vercel (배포, Cron, Blob)
- Anthropic SDK (콘텐츠 생성)
- @notionhq/client (MyThought 읽기/상태 업데이트)
- Telegram Bot API (사진 수집)

## 로컬 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
```

`.env.local.example` 을 `.env.local` 로 복사하고 값을 채운다. 로컬에서 콘텐츠 렌더링만 볼 거면 시크릿은 비워둬도 된다 (cron/webhook 은 수동 호출로만 동작).

## 디렉토리

```
app/            Next.js App Router (라우트, layout, sitemap, robots)
  api/          cron/notion-sync, telegram/webhook
content/
  posts/        MyThought 기반 에세이 .md
  diary/        Telegram 사진 기반 일기 .md
lib/
  mdx.ts        gray-matter 파싱, 리스트/상세 조회
  persona.ts    저자 persona 상수, 프롬프트 템플릿
public/
  ads.txt       Google AdSense publisher ID
CONTENT_RULES.md    모든 글의 작성 규칙 (파이프라인 시스템 프롬프트의 근간)
```

## 배포

Vercel 에 연결된 브랜치 `main` 에 푸시되면 자동 배포.

프로덕션 도메인: `iamlazyck.kr`
기존 학습 노트 블로그는 `study.iamlazyck.kr` 서브도메인으로 이전됨.

## 시드 7개

2026-04-22 기준으로 초기 시드 포스트 7개가 들어 있다. 모두 persona 톤과 `CONTENT_RULES.md` 기준을 충족하는 "정답지" 역할. 자동 파이프라인이 생성한 글도 이 톤과 구조에 수렴하는지 주기적으로 대조한다.

## 컨트리뷰션

이 레포는 개인 블로그라 외부 PR 은 받지 않지만, 자동 파이프라인이 생성한 글을 수동 검수한 뒤 커밋 메시지 `post: {title}` / `diary: {date}` 로 push 한다.
