
import React, { useEffect } from 'react'
import { Bars } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/MainPage'
import NoAccessPage from '../../pages/NoAccessPage'
import UserPage from '../../pages/UserPage'
import { getAuthorizedUserThunk } from '../../redux/actions/users'
import './style.css'

const authorizedRoutes = [
    { path: '/', element: <MainPage />, exact: true },
    { path: '/:id', element: <UserPage />, exact: true },
]

const ValidateRoutes = () => {
    const authorizedUser = useSelector(state => state.users.authorizedUser);
    const isLoading = useSelector(state => state.users.isUserLoading);
    const isAuthorized = authorizedUser ? true : false;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuthorizedUserThunk());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); /* получаем авторизованного пользователя только при маунте компоненты */

    if (isLoading) {
        return (
            <div className='cnValidateRoutesLoader'>
                <Bars color="#000BFF" height={80} width={80} />;
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {isAuthorized ? authorizedRoutes.map(route => <Route path={route.path} key={route.path} element={route.element} exact={route.exact} />) : <Route path='/' element={<NoAccessPage />} exact />}
            </Routes>
        </BrowserRouter>
    )
}

export default ValidateRoutes