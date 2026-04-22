---
title: "MCP 는 REST 를 감싸는 래퍼가 아니다 — Anthropic 발표 정리"
date: "2026-04-22"
kind: post
tags: ["mcp", "agents", "anthropic"]
excerpt: "David Soria Parra 의 MCP 미래 토크. 자동화에 관심 있는 사람 입장에서 가장 귀에 남는 한 줄은 'progressive discovery'."
source:
  type: youtube
  url: https://youtu.be/v3Fr2JR47KA
  author: David Soria Parra @ Anthropic
---

MCP (Model Context Protocol) 가 월 1억 1천만 다운로드를 찍었다는 숫자부터 일단 놀랐다. 주변에선 &ldquo;MCP 좀 떠들썩하긴 한데 실전에서 뭘 바꾸는 건지 모르겠다&rdquo; 는 반응이 많은데, 저 숫자를 보면 적어도 도구 생태계에선 이미 표준이 됐다.

이 영상은 Anthropic 의 David Soria Parra 가 MCP 의 18개월 여정과 미래를 정리한다. 나한테 가장 의미 있던 대목은 **&ldquo;에이전트를 위한 설계&rdquo; 와 &ldquo;REST API 래퍼&rdquo; 를 명확히 구분한 부분**이었다.

## REST 를 감싸면 끝이 아니다

편한 오해가 하나 있다. &ldquo;우리 API 를 MCP 서버로 감싸기만 하면 에이전트가 쓸 수 있다&rdquo; 는 것. 기술적으로는 맞지만 실전에선 빠르게 무너진다. 이유는 **컨텍스트 창**.

에이전트가 쓸 수 있는 도구가 50개인데, 50개 도구의 설명을 매 turn 마다 프롬프트에 로딩하면 입력 토큰이 수천으로 부푼다. 실제 작업 공간이 쪼그라든다.

Parra 가 제시한 해법이 **progressive discovery (점진적 발견)**.

- 에이전트에게 처음부터 모든 도구를 주지 않는다.
- 먼저 도구를 &ldquo;검색&rdquo; 하는 상위 도구 하나만 준다.
- 에이전트가 필요할 때 도구를 로드한다.

이게 MCP 프로토콜 레벨의 기능이 된다는 게 핵심이다. 모델이 컨텍스트를 세일즈맨이 쇼룸 뒤 창고를 뒤지듯 탐색하게 된다.

## 프로그램적 도구 호출 (programmatic tool calls)

또 다른 포인트는 모델이 **도구 호출을 코드처럼 조합**하게 하는 것. 지금은 모델이 &ldquo;tool A 호출 → 결과 보고 → tool B 호출&rdquo; 식 턴제인데, MCP 가 구조적 타입 정보를 제공하면 모델이 &ldquo;A 결과를 B 에 넘기는 파이프라인을 한 번에 짜라&rdquo; 고 지시받을 수 있다.

Bash 파이프 같은 걸 LLM 이 쓸 수 있게 되는 셈이다. 이게 되면 긴 체인 작업의 응답 지연과 실수율이 동시에 줄어든다.

## 자동화 집착자 입장에서

내 블로그 파이프라인도 결국은 작은 에이전트다. Notion 읽기, persona 프롬프트 실행, MDX 생성, git commit. 지금은 각 단계를 내가 짠 코드가 순서대로 호출한다. **이게 MCP 서버로 재구성되면 무엇이 좋아지나?**

- 다른 에이전트가 내 블로그 레포를 조작할 수 있게 된다. 예를 들어 내가 Telegram 에서 &ldquo;오늘 올린 글 제목 세 개로 다듬어줘&rdquo; 라고 보내면 다른 에이전트가 MCP 로 repo 상태를 읽고 PR 을 낸다.
- 내 작업 루틴들이 **조합 가능한 단위**로 쪼개진다. 블로그 배포, 뉴스레터 발송, 일정 갱신을 하나의 상위 에이전트가 오케스트레이션 가능.

단점도 보인다. **MCP 는 아직 권한/신뢰 경계가 거친 편**이라, 모든 작업 단위를 노출하면 사고 난다. 자동화 좋아하는 사람일수록 여기서 멍청한 실수를 한다. 나부터.

## 내가 다음에 할 것

- 블로그 레포에 **읽기 전용 MCP 서버** 한 개를 먼저 만든다. `listPosts`, `getPost`, `getBuildStatus` 정도. 쓰기 작업은 나중에.
- 그 MCP 를 Claude Desktop 에 꽂아두고 &ldquo;지난 7일 올린 글 요약&rdquo; 을 물어본다. 실제 토큰 절감이 얼마나 되는지 비교.
- 쓰기 권한은 별도 환경변수 flag 로 열고, 실수로 켜질 확률을 0 으로.

**&ldquo;MCP 를 이해한다&rdquo; 는 것은 protocol spec 을 읽는 게 아니라, 내 작업 도구들을 progressive discovery 할 수 있는 단위로 다시 설계한다는 뜻이다.** 영상 한 시간에서 가져가는 프레임 한 개.
