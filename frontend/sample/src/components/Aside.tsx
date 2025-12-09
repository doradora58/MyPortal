// src/components/Aside.tsx

import './Aside.css';

interface AsideProps {
  heading: string;
}

const Aside: React.FC<AsideProps> = ({ heading }) => {
  return (
    <aside className="app-aside">
        <p>【表示場所: サイドバー領域開始】</p>
      <h3>{heading}</h3>
      <ul>
        <li>補足情報 1</li>
        <li>補足情報 2</li>
        <li>プロフィールリンク</li>
      </ul>
      <p>【表示場所: サイドバー領域終了】</p>
    </aside>
  );
};

export default Aside;