import React from 'react';
import PostList from './components/PostList';
import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>My BBS</h1>
      </header>
      <main>
        <PostList />
      </main>
    </div>
  );
}

export default App
