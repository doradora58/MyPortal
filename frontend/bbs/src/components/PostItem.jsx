import React from 'react';

const categoryColors = {
  開発: 'development',
  アイデア: 'ideas',
  お知らせ: 'announcements',
};

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function PostItem({ post }) {
  const category = post.category || '雑談';
  const author = post.author || 'ゲスト';
  const initial = [...author][0] || 'G';

  return (
    <article className="bbs-post">
      <div className={`bbs-author-avatar avatar-${categoryColors[category] || 'default'}`} aria-hidden="true">
        {initial.toUpperCase()}
      </div>
      <div className="bbs-post-content">
        <div className="bbs-post-meta">
          <strong className="bbs-post-author">{author}</strong>
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </div>
        <h3>{post.title}</h3>
        <p className="bbs-post-body">{post.content}</p>
        <span className={`bbs-post-category category-${categoryColors[category] || 'default'}`}>{category}</span>
      </div>
    </article>
  );
}

export default PostItem;
