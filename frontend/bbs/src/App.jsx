import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function BBSHome() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="p-10 bg-white rounded-2xl shadow-xl w-full max-w-lg text-center">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-4">BBS Home (Index)</h2>
        <p className="text-gray-700 mb-6">
          ルーターがマッチしたパス: <span className="font-mono bg-blue-50 p-1 rounded font-semibold">{location.pathname}</span>
        </p>
        <p className="mb-8">
          このコンポーネントは、ルーターで **path="/"** にマッピングされています。
        </p>
        <div className="flex justify-center space-x-6">
          <Link 
            to="posts/123" 
            className="px-5 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition shadow-md"
          >
            投稿詳細を見る (ID: 123)
          </Link>
          <Link 
            to="about" 
            className="px-5 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition shadow-md"
          >
            Aboutページ
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>

      <Route path="/" element={<BBSHome />} /> 

      <Route path="*" element={<h1 className="text-red-600 text-4xl">404 - BBS内のページが見つかりません</h1>} />
    </Routes>
  );
}

export default App
