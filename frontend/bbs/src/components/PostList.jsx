import React, { useEffect, useMemo, useState } from 'react';
import PostItem from './PostItem';
import { dummyPosts } from '../data/posts';

const STORAGE_KEY = 'myportal-bbs-posts';

function readPosts() {
  const savedPosts = window.localStorage.getItem(STORAGE_KEY);
  if (!savedPosts) return dummyPosts;

  const parsedPosts = JSON.parse(savedPosts);
  if (!Array.isArray(parsedPosts)) {
    throw new Error('保存された投稿データの形式が正しくありません。');
  }
  return parsedPosts;
}

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storageError, setStorageError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('すべて');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    try {
      setPosts(readPosts());
    } catch (error) {
      setPosts(dummyPosts);
      setStorageError(error instanceof Error ? error.message : '投稿を読み込めませんでした。');
    } finally {
      setLoading(false);
    }
  }, []);

  const categories = useMemo(
    () => ['すべて', ...new Set(posts.map((post) => post.category || '雑談'))],
    [posts],
  );

  const visiblePosts = useMemo(() => {
    const searchText = query.trim().toLocaleLowerCase();
    return posts
      .filter((post) => category === 'すべて' || (post.category || '雑談') === category)
      .filter((post) => !searchText || `${post.title} ${post.content} ${post.author}`.toLocaleLowerCase().includes(searchText))
      .sort((a, b) => {
        const dateDifference = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return sortOrder === 'newest' ? dateDifference : -dateDifference;
      });
  }, [category, posts, query, sortOrder]);

  function createPost(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get('title') || '').trim();
    const content = String(formData.get('content') || '').trim();
    const author = String(formData.get('author') || '').trim();
    const postCategory = String(formData.get('category') || '雑談');

    if (!title || !content) {
      setFormError('タイトルと本文を入力してください。');
      return;
    }

    const newPosts = [
      {
        id: `post-${Date.now()}`,
        title,
        content,
        author: author || 'ゲスト',
        category: postCategory,
        createdAt: new Date().toISOString(),
      },
      ...posts,
    ];

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
      setPosts(newPosts);
      setCategory('すべて');
      setSortOrder('newest');
      setShowForm(false);
      setFormError('');
      setStorageError('');
    } catch {
      setFormError('投稿を保存できませんでした。ブラウザーの保存容量を確認してください。');
    }
  }

  if (loading) {
    return <p className="bbs-loading" role="status">投稿を読み込んでいます…</p>;
  }

  return (
    <>
      <section className="bbs-hero" aria-labelledby="bbs-title">
        <div>
          <p className="bbs-eyebrow">MYPORTAL COMMUNITY</p>
          <h1 id="bbs-title">コミュニティ</h1>
          <p className="bbs-hero-description">気づいたことやアイデアを、気軽に共有しましょう。</p>
        </div>
        <button
          type="button"
          className="bbs-primary-button"
          onClick={() => {
            setFormError('');
            setShowForm(true);
          }}
        >
          <span aria-hidden="true">＋</span> 新しい投稿
        </button>
        <div className="bbs-post-count" aria-label={`${posts.length}件の投稿`}>
          <strong>{posts.length}</strong><span>件の投稿</span>
        </div>
      </section>

      {storageError && <p className="bbs-error-banner" role="alert">{storageError}</p>}

      <section className="bbs-board" aria-labelledby="posts-heading">
        <div className="bbs-board-heading">
          <div>
            <p className="bbs-section-eyebrow">DISCUSSIONS</p>
            <h2 id="posts-heading">投稿一覧</h2>
          </div>
          <label className="bbs-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="投稿を検索"
              aria-label="投稿を検索"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="bbs-toolbar">
          <div className="bbs-categories" aria-label="カテゴリ">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={category === item ? 'bbs-category is-active' : 'bbs-category'}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="bbs-sort">
            <span>並び順</span>
            <select aria-label="並び順" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
            </select>
          </label>
        </div>

        <p className="bbs-results-count">
          {query || category !== 'すべて' ? `${visiblePosts.length}件の投稿` : 'みんなの投稿'}
        </p>

        {visiblePosts.length > 0 ? (
          <div className="bbs-post-list">
            {visiblePosts.map((post) => <PostItem key={post.id} post={post} />)}
          </div>
        ) : (
          <div className="bbs-empty-state">
            <span aria-hidden="true">⌕</span>
            <strong>投稿が見つかりません</strong>
            <p>検索語やカテゴリを変えて、もう一度お試しください。</p>
          </div>
        )}
      </section>

      {showForm && (
        <div
          className="bbs-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowForm(false);
          }}
        >
          <form className="bbs-post-form" role="dialog" aria-modal="true" aria-labelledby="bbs-form-title" onSubmit={createPost}>
            <header className="bbs-form-header">
              <div>
                <p className="bbs-section-eyebrow">NEW DISCUSSION</p>
                <h2 id="bbs-form-title">新しい投稿</h2>
              </div>
              <button type="button" className="bbs-close-button" aria-label="閉じる" onClick={() => setShowForm(false)}>×</button>
            </header>
            <label className="bbs-form-field">
              <span>タイトル <i>*</i></span>
              <input name="title" maxLength={100} required autoFocus placeholder="投稿のタイトル" />
            </label>
            <label className="bbs-form-field">
              <span>本文 <i>*</i></span>
              <textarea name="content" rows={6} maxLength={3000} required placeholder="内容を入力してください" />
            </label>
            <div className="bbs-form-row">
              <label className="bbs-form-field">
                <span>カテゴリ</span>
                <select name="category" defaultValue="雑談">
                  <option>雑談</option>
                  <option>開発</option>
                  <option>アイデア</option>
                  <option>お知らせ</option>
                </select>
              </label>
              <label className="bbs-form-field">
                <span>表示名</span>
                <input name="author" maxLength={40} placeholder="ゲスト" />
              </label>
            </div>
            <p className="bbs-form-privacy">個人を特定できる情報は投稿しないでください。</p>
            {formError && <p className="bbs-form-error" role="alert">{formError}</p>}
            <footer className="bbs-form-actions">
              <button type="button" className="bbs-secondary-button" onClick={() => setShowForm(false)}>キャンセル</button>
              <button type="submit" className="bbs-primary-button">投稿する</button>
            </footer>
          </form>
        </div>
      )}
    </>
  );
}

export default PostList;
