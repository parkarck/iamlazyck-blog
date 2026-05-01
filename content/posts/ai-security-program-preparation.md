---
title: "AI 시대에 보안 프로그램을 어떻게 준비해야 할까"
date: "2026-05-01"
kind: post
tags: ["security", "ai", "cybersecurity", "anthropic"]
excerpt: "AI가 취약점 발견과 악용 속도를 가속화한다. 방어자도 AI를 활용해야 한다."
source:
  type: article
  url: https://claude.com/blog/preparing-your-security-program-for-ai-accelerated-offense
  author: Anthropic Security Team
---

이번 주에 Anthropic에서 "Preparing your security program for AI-accelerated offense"라는 블로그 포스트를 냈다. 내용을 읽으면서 느낀 건, AI가 취약점 발견과 악용 속도를 가속화하고 있다는 점이다. 그리고 방어자도 AI를 활용해야 한다는 당연한 결론.

내 블로그 파이프라인을 개발하면서 보안에 대한 고민을 많이 했는데, 이 글은 내가 생각하던 방향과 많이 맞았다. 특히 패치 윈도우가 축소된다는 점이 가장 충격적이었다.

## 패치 윈도우가 축소된다

AI 모델은 이미 패치된 취약점의 서명을 인식하는 데 매우 효과적이다. 패치를 작동 가능한 익스플로잇으로 역추적하는 건 이 모델들이 가장 잘하는 기계적 분석이다. 이게 뭘 의미하는가? 패치가 발표되고 익스플로잇이 사용 가능해지는 윈도우가 축소된다는 거다.

과거에는 CVE가 발표되고 몇 주, 몇 달이 지나야 익스플로잇이 나왔다. 하지만 이제는 수 시간 내에 나올 수도 있다. 패치 발표와 익스플로잇 출현 사이의 시간이 눈에 띄게 줄어들고 있다.

내 경험을 말하자면, 이전에는 보안 업데이트를 "나중에 하자"라고 생각할 때가 많았다. 중요하지 않은 서비스, 인터넷에 노출되지 않은 시스템이라면 패치를 미루기도 했다. 하지만 이제는 그게 불가능해졌다. CISA KEV(Known Exploited Vulnerabilities) 카탈로그에 있는 건 즉시 패치해야 한다.

```
# 패치 우선순위를 결정하는 간단한 스크립트
def prioritize_cves(cves, kev_catalog, epss_threshold=0.5):
    """CVE 목록을 우선순위로 정렬"""
    prioritized = []

    for cve in cves:
        priority = "medium"

        # KEV 카탈로그에 있으면 최우선
        if cve["id"] in kev_catalog:
            priority = "critical"
        # EPSS 점수가 높으면 우선
        elif cve.get("epss_score", 0) > epss_threshold:
            priority = "high"

        prioritized.append({
            "id": cve["id"],
            "priority": priority,
            "epss_score": cve.get("epss_score", 0)
        })

    # 우선순위별로 정렬 (critical > high > medium)
    priority_order = {"critical": 0, "high": 1, "medium": 2}
    prioritized.sort(key=lambda x: priority_order[x["priority"]])

    return prioritized
```

이 스크립트를 만들면서 느낀 건, 자동화가 필수적이라는 점이다. 수동으로 CVE를 확인하고 우선순위를 정하는 건 이제 불가능하다. EPSS(Exploit Prediction Scoring System)를 사용해서 30일 이내에 익스플로잇될 확률을 예측하고, 그걸 기반으로 우선순위를 정해야 한다.

## 취약점 보고서 처리 볼륨이 급증한다

약 2년 안에, 취약점을 수신, 우선순위 지정, 수정하는 프로세스가 지금보다 훨씬 더 큰 압력을 받게 될 것이다. 취약점 관리 프로세스는 벤더와 업스트림에서 훨씬 더 많은 패치를 계획해야 한다.

발견 볼륨이 한 자릿수 증가할 것을 계획해야 한다. 인테이크, 트리아지, 수정 추적 같은 측면이 노출되는 취약점의 증가하는 숫자에 따라가야 한다. 여전히 스프레드시트와 주간 회의로 보안 회의를 하고 있다면, 따라가기 어려울 것이다.

이게 왜 중요한가? AI가 취약점을 찾는 속도가 훨씬 빨라졌기 때문이다. 내 경험을 말하자면, SAST(Static Application Security Testing)를 도입했을 때 수백 개의 경고가 나왔다. 그중에서 진짜 취약점을 찾는 데만 며칠이 걸렸다. AI가 이걸 자동화할 수 있다면, 볼륨은 급증할 수밖에 없다.

AI가 여기서 도움이 될 수 있다. 트리아지 속도를 높이는 게 그중 하나다. 트리아지는 병목 지점인데, 전문가 리뷰와 분류가 필요하기 때문이다. 프론티어 모델은 기존 백로그에 대한 중복 찾기를 하고, 자산에 대한 지식을 사용해서 노출을 추정하며, 영향을 받는 코드 경로가 미리 식별된 수정 티켓을 작성할 수 있다.

```python
# AI를 활용한 취약점 트리아지 예시
async def triage_vulnerability_with_ai(vuln, codebase, context):
    """AI를 사용하여 취약점의 우선순위를 결정"""
    prompt = f"""
    취약점 ID: {vuln['id']}
    설명: {vuln['description']}
    영향을 받는 파일: {vuln['affected_files']}

    다음을 기반으로 우선순위를 결정하세요:
    1. 인터넷에 노출된 코드인가?
    2. 인증/인가 로직인가?
    3. 신뢰할 수 없는 입력을 파싱하는가?
    4. 영향도(CVE severity)는?

    출력 형식:
    - 우선순위 (critical/high/medium/low)
    - 사유 (2-3문장)
    - 제안된 수정 방향
    """

    response = await ai_client.generate(prompt, context=context)

    return {
        "vuln_id": vuln['id'],
        "priority": response['priority'],
        "reason": response['reason'],
        "suggested_fix": response['suggested_fix'],
        "triaged_at": datetime.now().isoformat()
    }
```

이 코드를 작성하면서 느낀 건, AI가 트리아지를 크게 가속화할 수 있다는 점이다. 인간 개발자는 "버그를 이해하고 수정을 작성"하는 일에서 "제안된 수정이 올바른지 검증"하는 일로 역할이 바뀐다. 후자가 훨씬 빠르다.

## 배포 전 버그를 찾아야 한다

예방이 항상 치료보다 낫다. 프로덕션에 도달하는 버그는 결국 발견될 거라고 가정해야 한다. 그래서 보안 테스트는 훨씬 전에 일어나야 한다.

CI 파이프라인에 정적 분석과 AI 지원 코드 리뷰를 추가하고, 높은 신뢰도를 가진 발견에 대해서는 병합을 차단해야 한다. 거짓 양성이 이걸 비현실적으로 만든다면, 체크는 유지하되 툴링을 해결해야 한다. OWASP ASVS(Application Security Verification Standard)는 테스트 "통과"가 세 가지 엄격도 수준에서 어떻게 보이는지 정의한다.

내 블로그 파이프라인에도 이걸 적용했다. Notion에서 글을 읽어올 때, 입력 값 검증을 하고, 스크립트 실행 전에 검증을 한다. AI가 코드를 생성할 때도, 보안 검사를 먼저 통과해야 한다.

AI가 여기서도 도움이 될 수 있다. AI 취약점 스캐닝이 가장 중요하다. 로직은 간단하다. 공격자가 사용할 것과 같은 종류의 모델로 자신의 코드와 시스템을 스캔해야 한다. 공격자가 하기 전에 먼저 하는 거다. 이 접근 방식은 격리된 에이전트, 노이즈를 필터링하는 검증 단계, 기존 트리아지 프로세스로 가는 경로만 필요하다. 오늘 LLM로 이걸 할 수 있다.

## 설계는 침해를 가정해야 한다

공격자는 어딘가에 발판을 얻으려 할 것이다. 그곳에서 무엇에 도달할 수 있는지 제한해야 한다.

마찰에서 가치를 얻는 완화책—공격을 지루하게 만드는 것—은 무한한 인내심을 가진 적에게는 훨씬 덜 효과적이다. 하드 바리어가 아닌 완화책은 공격자가 그 지루한 단계를 분쇄할 수 있기 때문이다. 우리의 권장사항은 공격자가 무한한 인내심을 가지고 있어도 유지되는 컨트롤을 선호한다. 하드웨어 바운드 자격 증명, 만료 토큰, 그리고 단순히 불편한 경로가 아닌 존재하지 않는 네트워크 경로다.

제로 트러스트 아키텍처를 채택해야 한다. 서비스 간의 모든 요청을 인터넷에서 온 것처럼 인증하고 인가해야 한다. 하드웨어 ID와 피싱 방지 2FA(FIDO2 또는 패스키)를 사용해야 한다. 서비스를 ID로 격리해야 한다. 손상된 빌드 서버가 프로덕션 데이터베이스를 쿼리할 수 없어야 한다.

```yaml
# Zero Trust 네트워크 정책 예시
network_policies:
  - name: build-to-production-restriction
    source: build-service
    destination: production-database
    action: deny
    reason: Build service should not access production DB directly

  - name: require-hardware-identity
    source: "*"
    destination: sensitive-services
    action: require
    requirements:
      - hardware_attestation: true
      - mfa: fido2
      - token_expiry: 1hour

  - name: service-to-service-mtls
    source: "*"
    destination: "*"
    action: require
    requirements:
      - mtls: true
      - service_identity: verified
```

이 YAML을 작성하면서 느낀 건, 네트워크 분할은 백스탑이지 주요 방어책이 아니라는 점이다. 서비스 ID를 기반으로 격리해야 하고, 하드웨어 ID를 사용해야 한다.

## 내가 다음에 할 것

이 글을 읽고 나서 내 푸시업 추적 앱의 보안을 다시 생각해봤다. 현재 만들고 있는 푸시업 앱이 단순한 개인 프로젝트라고 생각해서 보안을 소홀히 했는데, 이건 큰 실수였다. 사용자 데이터를 저장하고, 기록을 관리하고, 일일 목표를 설정하는 건 모두 보안이 필요한 기능이다.

구체적으로는 다음과 같다. 첫째, 패치 우선순위 자동화 스크립트를 푸시업 앱에 적용한다. 의존성 스캐너와 연동해서 실시간으로 CVE를 모니터링하고, 우선순위를 자동으로 정한다. React, Node.js, PostgreSQL 같은 의존성이 있는데, 이걸 모니터링해야 한다. 둘째, CI 파이프라인에 AI 취약점 스캐닝을 추가한다. 코드가 병합되기 전에 AI가 스캔하고, 높은 우선순위 발견은 차단한다. 사용자 입력 검증, 인증 로직, 데이터 접근 제어가 포함되어야 한다. 셋째, 인시던트 응답 시간을 단축한다. 경고 큐 앞에 모델을 배치해서 첫 번째 조사를 자동화한다. 푸시업 앱은 인터넷에 노출되어 있어서, 익스플로잇이 빨리 나타날 수 있다.

그리고 마지막으로, 제로 트러스트 아키텍처를 점진적으로 도입한다. 하드웨어 ID 기반 인증과 서비스 간 mTLS를 적용해서 공격자의 이동 경로를 제한한다. 푸시업 앱의 프론트엔드와 백엔드, 데이터베이스 사이의 통신을 보호해야 한다.

강력한 AI 시스템이 주어져도, 하루아침에 모든 업무를 완벽하게 대체해 주는 마법은 없다. 보안도 마찬가지다. AI가 공격을 가속화하지만, 방어자도 AI를 활용하면 대응할 수 있다. 핵심은 인간이 진정으로 해결하고자 하는 문제에 집착하고, AI라는 지능과 협력하며 보안 프로그램을 지속적으로 개선하는 것이다.

호기심을 가지고 AI 도구들을 보안 업무에 하나씩 적용하며 조율해 나간다면, 이 시스템은 당신을 단순한 개발자를 넘어 AI 시대의 보안 전문가로 만들어 줄 것이다.
