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
        사이를 왔다갔다 하고, 밤에는 혼자 써볼 수 있는 사이드 프로젝트들을
        만지작거립니다. 1인 기업을 진지하게 고민 중이라, 제가 잘 쓰고 있는
        도구와 그걸로 얻은 작은 지렛대들을 여기에 기록합니다.
      </p>

      <h2>무엇이 올라오나</h2>
      <ul>
        <li>
          <strong>posts</strong> — 읽은 논문·영상·문서에 내 생각을 얹은 에세이.
          요약이 아니라 &ldquo;이걸 왜 봤고, 내 일에 어떻게 끼워넣을
          거냐&rdquo; 가 본문의 무게중심입니다.
        </li>
        <li>
          <strong>diary</strong> — 강아지 산책, 카페, 출근길에서 찍은 사진 한 장과
          짧은 메모.
        </li>
      </ul>

      <h2>연락</h2>
      <p>
        문의나 제안은{' '}
        <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a> 로. 스팸 외에는 웬만하면 답장합니다.
      </p>
    </div>
  );
}
