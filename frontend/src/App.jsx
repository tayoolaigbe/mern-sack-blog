import { Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/home/HomePage';
import ArticleDetail from './pages/articleDetail/ArticleDetail';
import RegisterPage from './pages/register/RegisterPage';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<div className="App font-opensans">
			<Routes>
				<Route index path="/" element={<HomePage />} />
				<Route path="/blog/:id" element={<ArticleDetail />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
