import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLock, FaScrewdriverWrench } from 'react-icons/fa6';
import './Login.css';

export default function Login() {
  return (
    <div className="login-page">
      <section className="login-status-card" aria-labelledby="login-title">
        <div className="login-status-icon" aria-hidden="true">
          <FaScrewdriverWrench />
        </div>
        <p className="login-eyebrow">MY PORTAL</p>
        <h1 id="login-title">ログイン機能を準備中です</h1>
        <p className="login-description">
          現在、ログイン機能を作成しています。
          利用できるようになるまで、もうしばらくお待ちください。
        </p>
        <div className="login-status-note">
          <FaLock aria-hidden="true" />
          <span>このページではパスワードなどの情報を入力しないでください。</span>
        </div>
        <Link to="/apps" className="login-apps-link">
          アプリ一覧へ戻る <FaArrowRight aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
