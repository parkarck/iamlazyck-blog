---
title: "AI 시대에도 소프트웨어 기본기는 여전히 중요하다"
date: "2026-04-29"
kind: post
tags: ["ai", "software-engineering", "vibe-coding"]
excerpt: "Spec → Code 만 믿으면 코드 망가진다. AI는 전술가고 우리는 전략가다."
source:
  type: youtube
  url: https://youtu.be/v4F1gFy-hqg
  author: Matt Pocock
---

"코드는 싸다"라는 말이 한때 유행했다. AI가 코드를 찍어낼 수 있으니까 코드 생성 비용은 0에 수렴한다는 논리였다. 하지만 Matt Pocock의 이 발표를 보고 깨달았다. **나쁜 코드가 AI 시대에는 오히려 가장 비싼 코드다.**

코드 품질이 낮으면 AI가 제공하는 혜택을 제대로 활용할 수 없다. 내가 Claude Code로 프로젝트를 돌려보며 겪었던 좌절들과 연결되는 대목이었다.

## Spec → Code 만 믿으면 코드 망가진다

스펙만 던지고 AI가 코드를 만들게 하면 어떻게 될까요? 처음엔 그럴듯해 보이지만, 반복할수록 코드 품질이 계속 나빠집니다.

나도 한때 "스펙만 잘 쓰면 AI가 알아서 해주겠지"라고 생각했다. Notion에 PRD를 상세하게 써놓고 Claude Code에 던져봤다. 결과는 처음엔 좋았는데, 수정을 거듭할수록 코드가 점점 엉망이 됐다.

구체적으로 말하면, 첫 번째 반복에서는 꽤 쓸만한 코드가 나왔다. TypeScript 타입도 잘 맞춰줬고, 함수 이름도 직관적이었다. 하지만 "여기에 기능 하나 더 추가해줘"라고 요청하자 코드 품질이 급격히 떨어졌다.

새로 추가된 기능이 기존 코드 구조와 충돌했다. 중복 로직이 생기고, 타입이 꼬이기 시작했다. "아니, 이렇게 짜면 안 되지"라고 생각하며 다시 스펙을 수정해서 던졌다. 이번엔 더 악화됐다. AI는 앞서 생성한 나쁜 코드를 기반으로 또 다른 나쁜 코드를 쌓아올렸다.

Pocock은 이를 "소프트웨어 엔트로피"라고 부른다. 물리학에서 엔트로피는 무질서도가 증가하는 현상인데, 소프트웨어도 마찬가지다. 시스템을 수정할 때마다 무질서가 증가하고, 적극적인 노력으로 질서를 유지하지 않으면 시스템은 점점 더 복잡해진다.

**코드는 싸지 않다. 좋은 코드는 변경하기 쉬운 코드다.** 이게 AI 시대에도 유효한 진실이다. 왜냐하면 AI는 우리가 제공하는 코드베이스를 학습해서 새 코드를 만들기 때문이다. 기반이 나쁘면 결과물도 나쁠 수밖에 없다.

## Grill Me — 공유된 설계 개념 만들기

"AI가 내가 원하는 걸 안 해줌"이라는 실패 모드를 겪어본 적 있을 겁니다. 원인은 간단하다. 나와 AI 사이에 **공유된 설계 개념(Design Concept)**이 없기 때문이다.

Pocock이 제시한 해결책은 **Grill Me**. "나한테 미친 듯이 질문해라"라는 프롬프트다.

```text
Interview me relentlessly about every aspect of this plan until we reach a shared understanding.
Walk down each branch of the design tree, resolving dependencies between decisions one by one.
```

이 프롬프트를 Claude Code에 넣어보면 AI가 수십~백 개의 질문을 던진다. "이 기능은 왜 필요한가?", "사용자는 누구인가?", "어떤 에러 케이스를 고려해야 하는가?" 등.

실제로 내 블로그 파이프라인 개발 때 이 프롬프트를 써봤다. 블로그 글을 자동으로 생성하는 시스템을 만들고 싶었는데, 단순히 "Notion에서 글을 읽어서 포스트로 변환해줘"라고만 요청했을 때는 엉뚱한 결과가 나왔다.

그래서 `Grill Me` 프롬프트를 넣고 Claude Code에게 물어봤다. 첫 번째 질문은 "이 블로그의 타겟 독자는 누구인가?"였다. "IT에 관심 있는 개발자들"이라고 답했다. 그 다음은 "어떤 톤으로 글을 써야 하는가?", "콘텐츠 소스는 무엇인가?", "자동화된다는 건 사용자 개입이 전혀 없다는 건가?" 등등.

질문이 50개가 넘었고, 대답하는 데만 20분이 걸렸다. 하지만 그 과정에서 내 생각이 정리됐다. 무엇보다 중요한 건, 그 다음에 내린 요청 결과물이 완전히 달라졌다는 점이다.

AI가 내 요구사항을 정확히 이해하고, 코드 구조부터 에러 처리까지 깊이 있게 구현했다. 처음엔 귀찮지만, 질문이 쌓일수록 명확해진다. 그 다음에 코드나 PRD로 넘어가면 AI가 내 의도를 제대로 파악해서 코드를 짠다.

Pocock은 이를 "Design Concept"라고 부른다. 여러 사람이 함께 무언가를 만들 때, 그들 사이에 떠다니는 추상적인 아이디어다. AI와 협업할 때도 이 Design Concept를 공유해야 한다. 그게 없으면 AI는 맹목으로 코드를 찍어낼 뿐이다.

## Ubiquitous Language — 공통 용어 체계

두 번째 실패 모드는 "AI가 말이 너무 많다". 원인은 공통 언어(용어 체계)가 없기 때문이다.

AI가 내 요청에 대해 길게 설명한다. "이 함수는 사용자 입력을 받아서 검증하고, 에러가 발생하면 적절한 핸들러로 전달하고..." 식으로 수백 자를 써내려간다. 내가 원하는 건 한 줄로 요약된 행동인데, AI는 중간 과정까지 다 설명한다.

DDD(Domain-Driven Design)의 **Ubiquitous Language** 개념을 적용하자. 프로젝트의 핵심 용어들을 정리한 마크다운 문서를 만든다. 사람, 코드, AI가 같은 단어를 같은 의미로 쓰게 된다.

내 블로그 파이프라인에 이를 적용해봤다. `TERMS.md`라는 파일을 만들고 핵심 용어들을 정의했다.

```markdown
## 용어 정의

**시드 (Seed)**
- Notion Database의 `MyThought` 필드에 저장된 원본 생각
- 글의 핵심 아이디어가 담긴 짧은 텍스트

**확장 (Expansion)**
- 시드를 persona 프롬프트로 전체 글로 발전시키는 과정
- 700~1500 단어의 완성된 포스트로 변환

**검증 (Validation)**
- 생성된 글이 CONTENT_RULES.md를 따르는지 확인하는 과정
- 금지 패턴, 길이, 구조 등을 체크

**파이프라인 (Pipeline)**
- Notion → LLM → MDX → Git Commit으로 이어지는 자동화 흐름
```

이 용어 정의를 Claude Code에 건네주고 나서부터 달라졌다. 내가 "시드를 확장해줘"라고 하면 AI가 바로 "TERMS.md에 정의된 확장 과정을 따라 시드를 포스트로 변환한다"라고 짧게 답한다.

이전에는 "Notion에서 데이터를 읽어서 LLM에 전달하고, 프롬프트를 적용해서 글을 생성하고..."라는 식으로 길게 설명했다. 이제는 핵심 용어만으로 빠르게 소통한다.

결과:
- ✅ AI가 덜 장황해집니다
- ✅ 구현이 의도와 더 잘 맞습니다
- ✅ 사람, 코드, AI가 같은 언어를 쓰게 됩니다

Ubiquitous Language는 단순히 용어 정의 문서가 아니다. 그건 프로젝트의 "언어 인프라"다. 이게 있어야 AI와 효율적으로 협업할 수 있다.

## Deep Module — AI 친화적 코드 구조

세 번째 실패 모드는 "코드가 만들어졌는데 안 돌아감". 기본 피드백 루프(타입 체크, 테스트, 브라우저 접근 등)는 필수지만, AI는 한 번에 너무 많이 만들려고 한다. 테스트와 피드백을 "나중에 몰아서" 하려 한다.

내가 Claude Code에 "이 블로그 카드 컴포넌트 만들어줘"라고 요청했을 때, AI는 한 번에 300줄짜리 코드를 찍어냈다. 타입, 스타일, 로직, 에러 처리까지 다 구현했다. 결과는 처음엔 작동했지만, 작은 수정 하나가 전체를 망가뜨렸다.

왜냐하면 한 번에 너무 많이 만들었기 때문이다. Pragmatic Programmer는 이를 "헤드라이트를 앞지르는 것"이라고 부른다. 속도 제한은 피드백 속도다. 너무 빠르게 가면 길을 못 본다.

해결책은 **TDD(Test Driven Development)**. 테스트 → 구현 → 리팩토링 순서로 작은 단위로 진행한다. 피드백 속도가 곧 개발 속도다.

하지만 테스트가 쉬운 코드베이스가 있어야 한다. 여기서 **Deep Module** 개념이 등장한다. John Ousterhout의 "A Philosophy of Software Design"에서 나온 개념이다.

**나쁜 구조 (Shallow Modules):**
- 기능은 적은데 인터페이스는 복잡
- 예: `getUserName(userId: string, withEmail: boolean, withAvatar: boolean, withLastLogin: boolean, withRole: boolean)`
- AI가 코드 탐색하다 길을 잃음
- 테스트하기 어려움 (경우의 수가 너무 많음)

**좋은 구조 (Deep Modules):**
- 단순한 인터페이스 + 내부에 많은 로직
- 예: `getUser(userId: string)` → `User` 객체 반환
- 테스트는 인터페이스 기준
- 구현은 AI에게 위임 가능

내 블로그 파이프라인도 이 구조로 재구성 중이다. 이전에는 Notion API와 직접 소통하는 함수가 15개나 있었다. `getPage`, `getBlock`, `updatePage`, `createPage` 등등.

```typescript
// 이전: Shallow Modules
export function getPage(id: string, withChildren: boolean, withContent: boolean) { }
export function getBlock(id: string, withChildren: boolean, withContent: boolean) { }
export function updatePage(id: string, title?: string, properties?: any, children?: any[]) { }
// ... 12개 더
```

이걸 하나의 Deep Module로 재구성했다.

```typescript
// 이후: Deep Module
export class NotionClient {
  async fetchPage(id: string): Promise<Page> { }
  async updatePage(page: Page): Promise<void> { }
  async queryPages(filter: Filter): Promise<Page[]> { }
}

// 내부에 복잡한 로직 감춤
class NotionClient {
  private async fetchBlocks(pageId: string): Promise<Block[]> { }
  private async fetchContent(blockId: string): Promise<Content> { }
  private async applyTransform(page: Page, transform: Transform): Promise<Page> { }
  // ... 많은 내부 함수들
}
```

외부 노출 함수는 5개 정도로 줄이고, 내부 복잡성은 모듈 안에 감췄다. 이제 AI가 내 코드베이스를 이해하고 수정하기 훨씬 쉬워졌다.

## 인간의 뇌도 보호해야 함

AI 덕분에 작업량은 늘었지만, 개발자는 더 피곤해졌습니다. 이전에 하루에 2개의 기능을 구현했다면, 이제는 5~6개는 만든다. 하지만 머리는 더 복잡하다.

문제는 코드베이스 전체를 내 머릿속에 들이고 있다는 점이다. AI가 수정한 코드를 검토하려면, 그 코드가 어디에 속하고 어떤 의존성이 있는지 알아야 한다. 그러려면 전체 구조를 이해해야 한다.

Deep Module 구조의 장점은 내부 구현을 "회색 상자"처럼 취급할 수 있다는 점이다.

회색 상자는 블랙박스와 화이트박스의 중간이다. 블랙박스는 내부를 전혀 볼 수 없고, 화이트박스는 내부를 완전히 볼 수 있다. 회색 상자는 인터페이스는 보지만, 구현은 상세히 보지 않는다.

```typescript
// 화이트박스 (나쁜 예)
function processPost(post: Post) {
  // 내부 구현을 다 이해해야 함
  const cleaned = sanitizePost(post);
  const tagged = extractTags(cleaned);
  const formatted = formatContent(tagged);
  const validated = validatePost(formatted);
  const saved = saveToDatabase(validated);
  return saved;
}

// 회색 상자 (좋은 예)
class PostProcessor {
  async process(post: Post): Promise<ProcessedPost> {
    // 인터페이스만 보고 검증
    return await this.pipeline.execute(post);
  }
}
```

나는 인터페이스, 의도, 테스트만 집중하면 된다. 구현은 AI에게 위임하고, 인터페이스 기준으로만 검증한다. 내부 로직이 어떻게 구현되었는지는 상세히 보지 않아도 된다. 테스트만 통과하면 OK다.

이렇게 하니 뇌의 피로도 급감했다. 50개 함수의 구현을 다 기억할 필요가 없다. 5개 모듈의 인터페이스만 기억하면 된다.

Kent Beck은 "매일 시스템의 설계에 투자하라"고 말했다. Specs-to-Code는 투자를 줄이는 게 아니라 투자를 포기하는 것이다. 반면 Deep Module 구조는 투자다. 투자한 만큼 뇌를 보호받는다.

## 내가 다음에 할 것

Pocock의 발표를 듣고 내 작업 흐름을 다시 생각해봤다. 몇 가지 당장 적용할 수 있는 것들이 있다.

첫째, 내 프로젝트 하나를 골라 **Ubiquitous Language 문서**를 만든다. 용어 정의 20~30개 정도. 내 블로그 파이프라인에는 이미 `TERMS.md`가 있지만, 다른 사이드 프로젝트에는 없다. 다음 주는 그 프로젝트에 용어 정의를 추가하는 데 시간을 쓸 것이다.

둘째, Claude Code에 `Grill Me` 프롬프트를 상용구로 등록해서 모든 새 작업에 적용해본다. 귀찮더라도 처음 10분은 질문하는 데 쓰자. 나중에 시간을 더 아낄 수 있다.

셋째, 코드베이스를 **Deep Module** 구조로 재구성한다. 인터페이스 단순화부터 시작. 현재 30개 함수가 노출되어 있는데, 이를 10개 모듈 50개 함수로 재구성하는 게 목표다.

넷째, TDD를 다시 실천한다. AI가 "한 번에 다 만들어줄게"라고 제안해도, "테스트 먼저 쓰고, 그 다음 구현해줘"라고 요청한다. 작은 단위로 진행하는 게 빠르다.

다섯째, AI에게 위임할 것과 내가 직접 할 것을 명확히 구분한다. 구현은 AI, 설계는 나. 테스트는 나, 코드는 AI. 이런 분업이 필요하다.

Pocock의 말이 맞다. **AI는 전술적인 개발자이고, 설계와 판단은 여전히 사람이 해야 한다.** 그래서 소프트웨어 기본기는 지금이 가장 중요하다.

AI가 훌륭한 병사가 되어줄 수 있지만, 전략가는 여전히 우리여야 한다. 병사가 전략을 짤 수 없듯, AI도 전략을 짤 수 없다. 우리가 전략을 짜고 AI가 실행하는 구조여야 한다.

그게 진정한 AI+Human 협업의 모습이다. 10년 전 우리가 좋은 코드를 쓰기 위해 배운 것들이, 지금도 그대로 유효하다. 다른 건 AI가 있어서 더 빨라졌다는 것뿐이다. 좋은 코드는 여전히 좋은 코드다. 그리고 좋은 코드를 만드는 능력은 여전히 우리가 가져야 할 핵심 역량이다.
