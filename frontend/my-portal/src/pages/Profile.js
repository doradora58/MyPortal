import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaLayerGroup, FaShieldHalved } from 'react-icons/fa6';
import './Profile.css';

const focusAreas = [
  {
    icon: <FaCode aria-hidden="true" />,
    title: 'Web development',
    description: '使いやすく、日々の作業に役立つWebアプリケーション。',
  },
  {
    icon: <FaLayerGroup aria-hidden="true" />,
    title: 'Connected tools',
    description: '業務ツールや運用サービスをつなぐ仕組みづくり。',
  },
  {
    icon: <FaShieldHalved aria-hidden="true" />,
    title: 'Thoughtful design',
    description: '情報を大切にし、わかりやすく安心して使える体験。',
  },
];

export default function Profile() {
  return (
    <div className="profile-page">
      <section className="profile-intro" aria-labelledby="profile-title">
        <p className="profile-eyebrow">ABOUT THIS WORKSPACE</p>
        <div className="profile-intro-content">
          <div className="profile-avatar" aria-hidden="true">M</div>
          <div>
            <h1 id="profile-title">このポータルについて</h1>
            <p>
              日々使うツールや、開発したアプリケーションへアクセスするための個人用ワークスペースです。
              個人を特定する情報は掲載せず、プロジェクトや取り組みを中心に紹介しています。
            </p>
          </div>
        </div>
        <span className="profile-note">
          <FaShieldHalved aria-hidden="true" /> 個人情報を掲載していません
        </span>
      </section>

      <section className="profile-focus" aria-labelledby="profile-focus-title">
        <div className="profile-section-heading">
          <p className="profile-eyebrow">AREAS OF INTEREST</p>
          <h2 id="profile-focus-title">取り組んでいること</h2>
        </div>
        <div className="profile-focus-grid">
          {focusAreas.map((area) => (
            <article className="profile-focus-card" key={area.title}>
              <span className="profile-focus-icon">{area.icon}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <Link to="/apps" className="profile-apps-link">
        アプリ一覧を見る <FaArrowRight aria-hidden="true" />
      </Link>
    </div>
  );
}
