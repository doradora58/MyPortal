import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';
// ステップ1で作成したダミーデータをインポート
import { dummyPosts } from '../data/posts';

const PostList = () => {
  // 実際はAPIから取得するが、ここではダミーデータをセット
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ★本来はここで fetch('/api/posts') を実行する ★
    setTimeout(() => {
      setPosts(dummyPosts); // データをセット
      setIsLoading(false);  // ロード完了
    }, 500); // 擬似的なロード遅延
  }, []);

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      <h1>Post list</h1>
      <button style={{ marginBottom: '20px' }}>Ctreate new post</button>
      
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
      
      {posts.length === 0 && <p>No posts yet...</p>}
    </div>
  );
};

export default PostList;