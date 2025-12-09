// src/components/Footer.tsx

import './Footer.css';

interface FooterProps {
  info: string;
}

const Footer: React.FC<FooterProps> = ({ info }) => {
  // <footer>タグ内の内容が、ページの最下部に表示されます
  return (
    <footer className="app-footer">
      <p>【表示場所: フッター領域開始】</p>
      <p>{info}</p>
      <p>【表示場所: フッター領域終了】</p>
    </footer>
  );
};

export default Footer;