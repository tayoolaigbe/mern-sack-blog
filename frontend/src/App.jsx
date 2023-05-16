import { Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/home/HomePage';
import ArticleDetail from './pages/articleDetail/ArticleDetail';
import RegisterPage from './pages/register/RegisterPage';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
	return (
		<div className="App font-opensans">
			<Routes>
				<Route index path="/" element={<HomePage />} />
				<Route path="/blog/:id" element={<ArticleDetail />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
