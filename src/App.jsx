import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react'
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import { store } from './redux/store';

const App = () => {
	return (
		<Provider store={store}> {/*  для работы redux thunk */}
			<BrowserRouter> {/* для настройки роутинга */}
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/:id' element={<UserPage />} /> {/* id пользователя */}
				</Routes>
			</BrowserRouter>
		</Provider>

	)
}

export default App;
