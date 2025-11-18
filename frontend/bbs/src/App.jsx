import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css'
function BBSHome() {
  const location = useLocation();
  return (
    <p>aaaaaaaaaaaaa</p>
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
