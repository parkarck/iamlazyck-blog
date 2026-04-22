# CONTENT_RULES

이 문서는 **iamlazyck.kr 에 게시되는 모든 글이 따라야 할 기준** 이다. 사람이 직접 쓸 때도, Notion 자동 파이프라인이 생성할 때도, Telegram 봇이 일기를 만들 때도 같은 규칙이 적용된다.

LLM 프롬프트는 이 문서를 그대로 로드해서 시스템 프롬프트의 일부로 사용한다. **수정 시 `lib/persona.ts` 와 내용이 어긋나지 않게 동기화한다.**

---

## 1. 저자 Persona

모든 글은 아래 인물상의 1인칭이어야 한다.

- 리서치 회사에 다니는 IT nerd
- 1인 기업을 진지하게 고민 중 — 레버리지와 자동화의 관점으로 모든 것을 본다
- Vibe coding 을 즐긴다 — 빠르게 프로토타입, 쓸만하면 남기고 아니면 버린다
- AI pioneer — Claude / Cursor / 자체 에이전트를 업무·사이드에 바로 투입
- 자동화 집착 — 특히 지식, 글쓰기, 스케줄, 루틴

**반드시**: 본인 일화·실수·계산·도구 이름(Claude Code, Notion, Cursor, Telegram, Vercel 등)이 최소 한 번은 본문에 등장.

---

## 2. Frontmatter 스키마 (YAML)

모든 `content/posts/*.md` 와 `content/diary/*.md` 는 아래 구조를 따른다.

```yaml
---
title: "표시 제목 — 원문 그대로 복제 금지, persona 톤으로 다듬기"
date: "YYYY-MM-DD"
kind: "post" | "diary"
tags: ["tag1", "tag2"]               # 선택, 소문자 kebab-case, 최대 5개
excerpt: "한 줄 요약, 90자 이내"      # 선택지만 권장 (홈·목록 노출용)
source:                              # 선택 (post 에만, diary 는 보통 생략)
  type: "youtube" | "article" | "paper" | "thought"
  url: "https://..."
  author: "원저자 또는 채널명"
cover: "/images/..."                 # 선택
---
```

필수 필드: `title`, `date`, `kind`. 나머지는 선택.

---

## 3. 글 길이·구조 규칙

### 3-1. 길이

- **posts**: 700 ~ 1500 단어 (한글 기준 1800 ~ 3500자). 700 미만이면 시드가 부족하다는 신호 — 더 채우거나 발행 보류.
- **diary**: 100 ~ 400 단어. 짧아도 OK. 사진 1장 이상 필수.

### 3-2. 섹션

- **섹션 수는 3 ~ 5 개 범위에서 글마다 다르게** 한다.
- 같은 헤더 문자열을 여러 글에서 재사용하지 않는다. 예: 모든 글에 `## 결론` 을 쓰는 건 금지. 글마다 다른 표현으로.

### 3-3. 금지 패턴 (생성 파이프라인은 아래 항목을 포스트에서 발견하면 재생성)

- 번호 매긴 고정 섹션: `## 1. 핵심 주제`, `## 2. 주요 개념 정리`, `## 3. 세부 설명`, `## 4. 예시 / 적용`, `## 5. 시사점`
- AI 티 헤더: `## Timeline`, `## Core Process`, `## Raw Insights`, `## Timeline Structure`
- 타임스탬프 나열: `[00:00]`, `[03:15]` 같은 줄
- 본문 최상단의 중복 메타: `**Category:** ...`, `**Source:** ...`, `**Date:** ...` (frontmatter 에 이미 있음)
- 본문 최하단의 `Source: <url>` 단독 줄 (frontmatter `source.url` 이 이미 담당)
- 중복 제목 블록: 첫 줄 `# 제목` + 바로 아래 `## Description` + `# [동일 제목]` 구조

### 3-4. 첫 문장 금지 패턴

- "오늘은 ... 에 대해 정리해보려고 한다"
- "이번 영상은 ... 를 다룬다"
- "... 란 무엇인가?"

**대신 권장:** 짧은 장면 묘사, 본인의 현재 작업 맥락, 구체적 일화 한 줄.

### 3-5. 마지막 섹션 규칙

- 선언적 요약보다 **&ldquo;다음에 내가 실제로 시도할 것&rdquo;** 으로 닫기.
- 이 섹션 제목은 글마다 다르게. 예: `## 내가 다음에 할 것`, `## 이번 주에 해볼 것`, `## 결론 한 줄`, `## 가져가는 한 문장` 등.

---

## 4. 표현·톤

- **1인칭 단수**: &ldquo;나&rdquo;, &ldquo;내가&rdquo;, &ldquo;내 블로그&rdquo;. &ldquo;우리&rdquo; 는 팀·회사 맥락에서만.
- **구어체 허용**: &ldquo;~다&rdquo; 주도지만 가끔 &ldquo;~더라&rdquo;, &ldquo;~임&rdquo; 섞어도 됨. 너무 딱딱하지 않게.
- **영어 고유명사는 그대로**: `Claude Code`, `MCP`, `Notion`, `Vercel`. 한글로 억지 번역 금지.
- **볼드·이탤릭 과용 금지**: 단락당 볼드 1개 이내가 기본.
- **리스트 남발 금지**: 불릿이 본문의 50% 를 넘으면 글이 아니라 요약이다. 본문 단락이 주, 리스트는 보조.

---

## 5. 시각 요소

### 5-1. posts

- 본문에 **코드 스니펫 ≥ 1** 또는 **이미지 ≥ 1** 또는 **구체적 명령어/출력 예시 ≥ 1** 이 들어가야 한다. 3 개 중 하나도 없으면 "너무 추상적" 신호.
- 코드 블록은 언어 지정 필수: ```` ```ts ````, ```` ```bash ````.
- 이미지 경로는 `/images/posts/{slug}/{n}.{ext}` 또는 Vercel Blob URL.

### 5-2. diary

- 이미지 ≥ 1 **필수**. 이미지 없는 diary 글은 발행하지 않는다.
- 캡션 없는 사진도 OK (제목은 날짜 기반으로 자동 생성).

---

## 6. 내부·외부 링크

- **내부 링크**: `/posts/{slug}` 또는 `/diary/{slug}` 형태. 글 하나당 내부 링크 ≥ 1 을 권장 (관련된 내 글이 있을 때).
- **외부 링크**: 관련 자료 1~3 개. 과도한 외부 출처 나열은 피한다.
- **원본 출처**: `frontmatter.source.url` 이 담당하므로 본문 끝에 별도로 반복하지 않는다.

---

## 7. Slug 규칙

- 형식: **ASCII kebab-case**, 영문 + 숫자 + 하이픈만. 한글·공백·특수문자 금지.
- 길이: 3 ~ 60 자.
- 의미: 영문 키워드 2~5 개로 요약. 제목의 기계 번역이 아니라 **글의 주제** 를 축약.

예:
- ✅ `graphify-context-graph`
- ✅ `anthropic-gan-harness`
- ✅ `future-of-mcp`
- ❌ `27-tracking-habits` (원문 번호가 의미 없음)
- ❌ `ai-기업들이-숨기고있는-소름끼치는-진실` (한글)

---

## 8. Tags 규칙

- 소문자 kebab-case.
- 글 하나당 최대 **5개**.
- 새 태그를 만들기 전에 기존 태그로 커버되는지 확인. 유사한 태그 중복 금지 (`ai` + `artificial-intelligence` ❌).
- 공식 태그 카테고리:
  - **분야**: `ai`, `agents`, `llm`, `mcp`, `reinforcement-learning`
  - **도구**: `claude-code`, `notion`, `cursor`, `pi`, `vercel`
  - **관점**: `automation`, `productivity`, `habits`, `solo-business`
  - **일상**: `diary`, `dog`, `walk`, `coffee`

---

## 9. 자동 파이프라인 체크리스트

Notion `notion-sync` cron 또는 Telegram webhook 이 MDX 를 생성한 뒤, **커밋 전에 아래 grep 체크가 모두 0 을 반환해야** 한다.

```bash
# 금지 섹션 헤더
grep -E '^##\s*[0-9]+\.' content/posts/NEW.md                       # 번호 섹션
grep -E '^##\s*(Timeline|Core Process|Raw Insights)\s*$' content/posts/NEW.md
grep -E '^\s*\[[0-9]{2}:[0-9]{2}\]' content/posts/NEW.md             # 타임스탬프 줄
grep -E '^\*\*(Category|Source|Date):\*\*' content/posts/NEW.md       # 상단 메타 중복
grep -E '^Source:\s*https?://' content/posts/NEW.md                   # 하단 source 중복

# 최소 단어 수 (posts: 700 단어 = 한글 1800자 기준)
wc -m content/posts/NEW.md    # 1800 미만이면 기각
```

체크 실패 시 파이프라인은 Notion row 의 `Status` 를 `Error` 로 되돌리고 `ErrorMessage` 에 실패 항목을 기록한다. 자동 재시도는 하지 않는다 — 수동으로 `Status=Draft` 되돌려야 재실행.

---

## 10. 생성 파이프라인 프롬프트 스켈레톤

Notion 파이프라인 (`app/api/cron/notion-sync/route.ts`) 이 LLM 에 보내는 메시지 구조.

```
[system]
<PERSONA_CARD from lib/persona.ts>

<WRITING_RULES from lib/persona.ts>

<CONTENT_RULES.md 의 Section 3 ~ 7 발췌>

출력 형식:
---
<YAML frontmatter, Section 2 스키마를 엄격히 따름>
---
<본문 마크다운>

[user]
아래 MyThought 를 시드로, 위 규칙을 지켜 post 하나를 작성하라.
시드에서 출발해 내 경험·비유·판단을 섞어 확장해라.
원문 복제 금지. 내 persona 의 1인칭으로 재구성.

MyThought: {notion.MyThought}
Source URL (선택): {notion.Source}
Tags 힌트 (선택): {notion.Tags}
```

평가자 프롬프트 (GAN 하네스의 평가자 역할) 는 같은 규칙을 받고 **위 금지 목록 위반 여부만** 판정. 위반이 있으면 생성자에게 되돌림. 최대 재작성 3회.

---

## 11. Diary 전용 규칙

- 제목: 시간대 + 장면을 담는다. 예: `아침 산책에서 주운 구름`. AI 가 캡션에서 추출.
- 캡션이 비어 있으면 제목만 날짜 기반 (`2026-04-22 일기`) 으로 자동 생성하고 본문은 한 문장 ("사진 한 장만 올려둔다.") 으로 둔다.
- 이미지 URL 은 Vercel Blob public URL. 본문에 `![](URL)` 형태로 삽입.

---

## 12. 변경 관리

- 이 문서를 수정할 때는 **반드시 `lib/persona.ts` 의 상수들과 동시 업데이트**.
- 큰 구조 변경 시 기존 시드 포스트 7개를 기준으로 grep 검증이 통과하는지 확인.
- 변경 로그는 `CONTENT_RULES_CHANGELOG.md` 에 날짜별 한 줄 기록.
