---
title: "Pi Coding Agent 를 30분 만져봤다 — Claude Code 와 뭐가 다른가"
date: "2026-04-22"
kind: post
tags: ["coding-agents", "pi", "claude-code"]
excerpt: "오픈소스 코딩 에이전트 Pi. 1000 토큰 이하 시스템 프롬프트, TypeScript 확장, OpenRouter 통합. 가볍게 돌려본 감상."
source:
  type: youtube
  url: https://youtu.be/BZ0w0JhPQ9o
  author: Pi Free Course
---

Claude Code 를 매일 쓰다 보면 대안 에이전트가 나왔다는 소식에 반사적으로 탭을 연다. Pi Coding Agent 는 &ldquo;오픈소스&rdquo; 와 &ldquo;시스템 프롬프트 1000 토큰 이하&rdquo; 라는 두 가지 포인트로 내 관심을 잡았다. 영상 보고 30분 돌려본 감상.

## 가장 큰 차이: 프롬프트가 보인다

Claude Code 는 프롬프트가 블랙박스다. 내가 만들어 넣는 `CLAUDE.md` 와 유저 메시지만 내 것이고, 그 뒤 하네스가 어떻게 감싸는지는 추측의 영역이다.

Pi 는 반대다. 시스템 프롬프트가 1000 토큰 이하로 공개되어 있고, 그걸 사용자가 직접 편집하는 게 설계 의도다. Vibe coding 좋아하는 사람 입장에서 이게 결정적이다. **나는 내가 쓰는 도구의 내부를 보고 싶다.** 안 봐도 될 때도 많지만, 보고 싶을 때 보는 것과 끝까지 못 보는 것의 차이는 크다.

## 기본 도구는 딱 네 개

Pi 가 내장한 도구는 `read`, `bash`, `edit`, `write`. 이 미니멀리즘이 마음에 든다. 나머지 기능은 **TypeScript 확장**으로 넣는다. 공식 예시가 Git 상태를 UI 에 표시하는 작은 확장.

여기서 내가 떠올린 것 — **블로그 파이프라인용 확장**.

- `notion-read` — Notion MyThought 가져오기
- `persona-draft` — 내 persona 프롬프트로 초안 생성
- `blob-upload` — Vercel Blob 에 이미지 업로드
- `deploy-check` — 최신 배포 상태 확인

이렇게 내 작업에 딱 맞는 도구 네 개를 얹으면 Pi 가 &ldquo;내 블로그 운영 에이전트&rdquo; 가 된다. Claude Code 보다 훨씬 가볍게.

## 모델 선택이 완전히 분리되어 있다

Pi 의 강점 중 하나는 OpenRouter 통합이다. OpenAI, Anthropic, Google, 심지어 오픈 웨이트 모델까지 API 키 하나로 전환. **가격 곡선이 급격한 이 시점에 모델을 하나에 못 박아두는 건 비싸다.**

내 기준으로 제일 쓸모 있는 패턴은:

- 일상 편집/리팩토링 — 저렴한 모델 (Haiku, GPT-4o mini 급)
- 설계 결정이 필요한 순간 — Opus 나 GPT-5
- 긴 컨텍스트 — Gemini 계열

Claude Code 에서도 모델 바꿀 수 있지만 마찰이 더 있다. Pi 에서 이게 한 줄이다.

## 단점도 분명

30분만에 다 느낀 건 아니지만, 첫인상의 한계도 있었다.

- **에코시스템이 아직 얇다.** Claude Code 는 커뮤니티 스킬·MCP 서버가 이미 풍부하다. Pi 는 초기.
- **안정성은 검증 안 됨.** 긴 작업을 맡길 때 Claude Code 만큼 돌려본 시간이 없다. 주요 프로젝트에는 Pi 를 메인으로 안 쓴다.
- **Claude 의 &ldquo;그냥 맞힌다&rdquo; 느낌은 아직 Claude 가 가장 강하다.** 이건 모델 차이라 도구를 바꿔도 안 따라온다.

## 1인 기업 대비로 본 Pi

에이전트 도구를 여러 개 물려 쓰는 건 1인 사업에서 꽤 중요하다고 본다. 이유:

1. **단일 벤더 락인 비용이 크다.** Claude 만 쓰면 Anthropic 이 가격을 올리거나 정책을 바꿀 때 협상력이 0.
2. **도구별로 잘하는 작업이 다르다.** Claude Code 는 긴 코드베이스 이해, Pi 는 좁고 깊은 자동화.
3. **내 스택을 내가 읽을 수 있어야 한다.** 오픈 소스 쪽이 장기적으로 안전.

## 결론

오늘부터 Pi 를 메인 에이전트로 바꾸지는 않는다. 대신 **블로그 파이프라인 용도로 Pi 에 확장 네 개 얹는 실험**을 다음 주에 해볼 생각. Claude Code 와 Pi 가 한 레포 안에 공존하는 방식으로 가면, 두 도구의 강점을 동시에 쓸 수 있다.

Vibe coding 의 본질은 도구 하나에 충성하지 않는 것이다. 오늘 재밌는 걸 오늘 쓰는 것. Pi 는 재밌었다.
