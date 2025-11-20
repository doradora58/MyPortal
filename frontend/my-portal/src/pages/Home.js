import React from 'react';
import Card from '../components/Card';
import DashboardMetric from '../components/DashboardMetric'; // ★追加★
import { Link } from 'react-router-dom';
import { FaComments, FaRegFileAlt, FaUsers } from 'react-icons/fa'; // アイコンの追加

const Home = () => {
  return (
  <div className="container">
      <h1 style={{ marginBottom: '40px' }}>Welcome to my portal</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <DashboardMetric 
          icon={<FaComments />} 
          label="BBS 今月の投稿数" 
          value={125} 
          unit="件" 
          color="#FF9800" // オレンジ系
        />
        <DashboardMetric 
          icon={<FaRegFileAlt />} 
          label="未読ドキュメント" 
          value={3} 
          unit="件" 
          color="#03A9F4" // ブルー系
        />
        <DashboardMetric 
          icon={<FaUsers />} 
          label="総ユーザー数" 
          value={42} 
          unit="人" 
          color="#8BC34A" // グリーン系
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* ... 既存のカード（Apps, Profile, News）はそのまま ... */}
        <Card title="🚀 アプリケーション">
          <p>BBS掲示板やその他のツールにすぐにアクセスできます。</p>
          <Link to="/apps">アプリ一覧へ</Link>
        </Card>
        
        <Card title="🔔 最新ニュース">
          <ul>
            <li>Vite 3.0がリリースされました！</li>
            <li>社内ポータルのメンテナンス情報</li>
          </ul>
        </Card>
        
        <Card title="👤 プロフィール情報">
          <p>認証状態を気にせず、常に利用可能な固定情報セクションです。</p>
          <Link to="/profile">詳細を見る</Link>
        </Card>
      </div>
      </div>
  );
}
export default Home;