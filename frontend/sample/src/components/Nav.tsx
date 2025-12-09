// src/components/Nav.tsx

import './Nav.css';

const Nav: React.FC = () => {
    return (
        <nav className="main-nav">
            <p>【表示場所: ナビ領域開始】</p>
            <ul>
                <li><a href="#">ホーム</a></li>
                <li><a href="#">サービス</a></li>
                <li><a href="#">会社概要</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
            <p>【表示場所: ナビ領域終了】</p>
        </nav>
    );
};

export default Nav;