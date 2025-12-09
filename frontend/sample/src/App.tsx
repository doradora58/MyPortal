// src/App.tsx
import Main from './components/Main'
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from './components/Aside';
import Nav from './components/Nav';
import Notification from './components/Notification';
import './App.css';

// CSSのインポートは不要なので、ここでは省略します。

function App() {
  // 渡すデータを定義
  const headerTitle = "シンプルなWebApp";
  const footerInfo = "Copyright 2024 (c) React Vite Sample";
  const sectionNumber = 1;
  return (
    // レイアウト調整のための外枠（CSSなしでも縦に並ぶようになります）
    <>
      {/* 1. Headerコンポーネント: ページの最上部に表示されます */}
      <Header titleText={headerTitle} />
      <Nav/>
      {/* 2. Notification: Headerの直後に配置 */}
      <Notification message="【重要】サーバーメンテナンスのお知らせ: 11月30日 午前2時〜4時" />
      <div className="content-area">
        {/* 2. mainタグ: HeaderとFooterの間、主要なコンテンツ領域です */}
        <Main sectionNumber={sectionNumber} />
        {/* 3. Aside (サイドバー) を追加 */}
        <Aside heading="補足情報" />
      </div>
      {/* 4. Footerコンポーネント: ページの最下部に表示されます */}
      <Footer info={footerInfo} />
    </>
  );
}

export default App;