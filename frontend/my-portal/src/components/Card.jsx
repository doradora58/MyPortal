import React from 'react';
import './Card.css'; // ★CSSファイルをインポート★

// style属性は不要になる
const Card = ({ title, children, className = '' }) => {
  return (
    // className にデフォルトで 'card-container' を適用
    <div className={`card-container ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;