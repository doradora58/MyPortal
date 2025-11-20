import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Apps from './pages/Apps';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>

    </BrowserRouter>
  );
}

export default App;
