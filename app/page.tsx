// page.tsx는 서버 컴포넌트라서 클라이언트 관련 코드는 분리해야 함

import UI from './ui';

export default function Home() {
  return (
    <main>
      <UI />
    </main>
  );
}
