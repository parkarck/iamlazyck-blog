import type { Metadata } from 'next';
import { AUTHOR } from '@/lib/persona';

export const metadata: Metadata = {
  title: 'privacy',
  description: '개인정보 처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="static-page">
      <h1>개인정보 처리방침</h1>
      <p>
        최종 업데이트: 2026-04-22. 본 방침은 iamlazyck.kr (이하 &ldquo;사이트&rdquo;) 가
        수집하는 정보와 그 처리 방식에 대해 설명합니다.
      </p>

      <h2>수집 항목</h2>
      <ul>
        <li>
          <strong>로그</strong> — Vercel 호스팅이 자동 기록하는 IP, User-Agent,
          리퍼러, 접속 시각.
        </li>
        <li>
          <strong>분석</strong> — 방문자 수와 페이지 조회수를 위해 Google
          Analytics 4 를 사용할 수 있습니다.
        </li>
        <li>
          <strong>광고</strong> — Google AdSense 는 관심사 기반 광고를 위해
          쿠키를 사용합니다. 자세한 설명과 비활성화 방법은{' '}
          <a href="https://policies.google.com/technologies/ads">
            Google 광고 정책
          </a>
          을 참고하세요.
        </li>
        <li>
          <strong>문의</strong> — 이메일로 연락 시 제공한 메일 주소와 본문.
        </li>
      </ul>

      <h2>수집 목적</h2>
      <ul>
        <li>사이트 운영과 안정성 유지</li>
        <li>트래픽 분석과 콘텐츠 개선</li>
        <li>광고 서비스 제공</li>
        <li>문의 회신</li>
      </ul>

      <h2>보관 기간</h2>
      <p>
        호스팅 로그는 Vercel 기본 정책에 따라 일정 기간 후 자동 삭제됩니다.
        이메일 문의는 회신 후 1년 이내에 파기합니다.
      </p>

      <h2>제3자 제공</h2>
      <p>
        법령에 의한 요구 외에 수집한 정보를 제3자에게 제공하지 않습니다. 광고
        관련 정보는 Google AdSense 정책에 따릅니다.
      </p>

      <h2>이용자 권리</h2>
      <p>
        본인의 정보에 대한 열람·정정·삭제를 요청할 수 있습니다. 요청은 아래
        연락처로 해주세요.
      </p>

      <h2>문의</h2>
      <p>
        <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a>
      </p>
    </div>
  );
}
