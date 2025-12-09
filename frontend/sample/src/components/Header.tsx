// src/components/Header.tsx

import './Header.css';

// Propsの型定義は、コードの安全性のために残します
interface HeaderProps {
  titleText: string;
}

const Header: React.FC<HeaderProps> = ({ titleText }) => {
  // <header>タグ内の内容が、ページの最上部に表示されます
  return (
    <header className="app-header">
      <p>【表示場所: ヘッダー領域開始】</p>
      <h1>{titleText}</h1>
      <p>【表示場所: ヘッダー領域終了】</p>
    </header>
  );
};

export default Header;