import { Provider } from 'react-redux';
import React from 'react'
import { store } from './redux/store';
import ValidateRoutes from './components/ValidateRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<Provider store={store}> {/*  для работы redux thunk */}
			<ValidateRoutes />
			<ToastContainer position='top-center' />
		</Provider>
	)
}

export default App;
