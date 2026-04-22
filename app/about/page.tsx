import type { Metadata } from 'next';
import { AUTHOR } from '@/lib/persona';

export const metadata: Metadata = {
  title: 'about',
  description: 'iamlazyck — 누가 쓰고 왜 쓰는 블로그인가.',
};

export default function AboutPage() {
  return (
    <div className="static-page">
      <h1>about</h1>

      <h2>누가 쓰나</h2>
      <p>
        안녕하세요, {AUTHOR.name} 입니다. 낮에는 리서치 회사에서 데이터와 코드
        사이를 왔다갔다 하고, 밤에는 혼자 써볼 수 있는 자동화 파이프라인을
        만지작거립니다. 1인 기업을 진지하게 고민 중이라, 제가 잘 쓰고 있는
        도구와 그걸로 얻은 작은 지렛대들을 여기에 기록합니다.
      </p>

      <h2>무엇이 올라오나</h2>
      <ul>
        <li>
          <strong>posts</strong> — 읽은 논문·영상·문서에 내 생각을 얹은 에세이.
          자동 요약이 아니라 &ldquo;이걸 왜 봤고, 내 일에 어떻게 끼워넣을
          거냐&rdquo; 가 본문의 무게중심입니다.
        </li>
        <li>
          <strong>diary</strong> — 강아지 산책, 카페, 출근길. Telegram 봇으로
          사진을 보내면 거기 찍힌 순간을 짧게 기록해 둡니다.
        </li>
      </ul>

      <h2>어떻게 쓰나</h2>
      <p>
        글의 시드는 항상 제가 직접 씁니다. Notion 의 <code>MyThought</code> 라는
        필드에 생각을 던져두면, 1시간마다 돌아가는 파이프라인이 그 시드를 제
        persona 프롬프트로 확장해서 이 블로그에 올립니다. 사진은 Telegram 봇이
        받아 Vercel Blob 에 올리고, 짧은 캡션과 함께 diary 에 게시됩니다. 자동화
        자체가 이 블로그의 주제이기도 해서, 파이프라인은 계속 공개하면서
        업데이트할 예정입니다.
      </p>

      <h2>연락</h2>
      <p>
        문의나 제안은{' '}
        <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a> 로. 스팸 외에는 웬만하면 답장합니다.
      </p>
    </div>
  );
}
