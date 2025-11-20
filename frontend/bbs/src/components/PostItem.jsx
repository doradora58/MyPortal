import React from 'react';

// PostItem は一つの投稿データを受け取る
const PostItem = ({ post }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
      <h3>{post.title} (ID: {post.id})</h3>
      <p>{post.content.substring(0, 50)}...</p>
      <small>
        Author: {post.author} / Date : {post.createdAt}
      </small>
      {/* <a>タグで詳細ページへのリンクを想定 */}
      <a href={`/post/${post.id}`} style={{ marginLeft: '10px' }}>Show detail</a>
    </div>
  );
};

export default PostItem;