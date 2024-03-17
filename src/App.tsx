import React, {Suspense, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/home/Login";
import ForgotPassword from "./pages/forgot_password/Forgot-password";
import NewPassword from "./pages/password_set/NewPassword";

function App() {
    useEffect(() => {
       sessionStorage.setItem('mocked_user', JSON.stringify({email: 'admin@ua.ua', password: '12345678'}))
    }, [])

    return (
        <Suspense fallback={'404'}>
            <Routes>
                <Route path={'/'} element={<Login/>}/>
                <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
                <Route path={'/password-set'} element={<NewPassword/>}/>
            </Routes>
        </Suspense>
    );
}

export default App;
