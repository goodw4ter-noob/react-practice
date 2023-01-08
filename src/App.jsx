import { Provider } from 'react-redux';
import React from 'react'
import { store } from './redux/store';
import ValidateRoutes from './components/ValidateRoutes';

const App = () => {
	return (
		<Provider store={store}> {/*  для работы redux thunk */}
			<ValidateRoutes />
		</Provider>
	)
}

export default App;
