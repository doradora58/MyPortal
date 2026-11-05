import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowUpRightFromSquare, FaComments, FaUser } from 'react-icons/fa6';
import apps from '../data/apps';
import './Home.css';

const featuredApps = ['FMS', 'OrderManagement', 'Grafana']
  .map((title) => apps.find((app) => app.title === title))
  .filter(Boolean);

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-eyebrow">MY WORKSPACE</p>
          <h1 id="home-title">すべてのツールに、<br />ここからアクセス。</h1>
          <p className="home-lead">
            日々使うアプリやサービスをひとつの場所にまとめました。
            必要なツールへすぐに移動できます。
          </p>
          <div className="home-actions">
            <Link to="/apps" className="home-primary-action">
              アプリ一覧を見る <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/bbs/" className="home-secondary-action">
              掲示板へ <FaComments aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="home-hero-aside" aria-label={`${apps.length}個のアプリを利用できます`}>
          <div className="home-orbit home-orbit-one" />
          <div className="home-orbit home-orbit-two" />
          <div className="home-workspace-card">
            <span className="home-workspace-icon"><FaArrowUpRightFromSquare aria-hidden="true" /></span>
            <span className="home-workspace-label">YOUR WORKSPACE</span>
            <strong>{apps.length}</strong>
            <span className="home-workspace-caption">apps in one place</span>
            <div className="home-workspace-dots" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </div>
          </div>
        </div>
      </section>

      <section className="home-featured" aria-labelledby="featured-title">
        <div className="home-section-heading">
          <div>
            <p className="home-section-eyebrow">QUICK ACCESS</p>
            <h2 id="featured-title">よく使うアプリ</h2>
          </div>
          <Link to="/apps" className="home-view-all">
            すべて見る <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="home-featured-grid">
          {featuredApps.map((app) => (
            <a
              className="home-feature-card"
              href={app.url}
              key={app.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="home-feature-icon" aria-hidden="true">{app.icon}</span>
              <span className="home-feature-copy">
                <span className="home-feature-category">{app.category}</span>
                <strong>{app.title}</strong>
                <span className="home-feature-description">{app.description}</span>
              </span>
              <FaArrowUpRightFromSquare className="home-feature-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className="home-bottom-links" aria-label="その他のリンク">
        <Link to="/profile" className="home-bottom-link">
          <span className="home-bottom-icon"><FaUser aria-hidden="true" /></span>
          <span><strong>プロフィール</strong><small>プロフィール情報を見る</small></span>
          <FaArrowRight className="home-bottom-arrow" aria-hidden="true" />
        </Link>
        <Link to="/bbs/" className="home-bottom-link">
          <span className="home-bottom-icon"><FaComments aria-hidden="true" /></span>
          <span><strong>コミュニティ</strong><small>BBSで話題をチェック</small></span>
          <FaArrowRight className="home-bottom-arrow" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}

export default Home;
