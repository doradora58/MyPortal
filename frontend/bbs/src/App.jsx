import React from 'react';
import PostList from './components/PostList';
import './App.css';

function App() {
  return (
    <div className="bbs-app">
      <header className="bbs-topbar">
        <a className="bbs-brand" href="/">
          <span className="bbs-brand-mark" aria-hidden="true">M</span>
          <span>MyPortal <i>/</i> コミュニティ</span>
        </a>
        <a className="bbs-back-link" href="/">ポータルへ戻る</a>
      </header>
      <main className="bbs-main">
        <PostList />
      </main>
      <footer className="bbs-footer">MyPortal Community</footer>
    </div>
  );
}

export default App;
