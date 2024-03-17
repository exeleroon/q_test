import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../api/api";
import {userSlice} from "./reducers/UsersReducer";
import {ILoginData, IResetPassword, ISetPassword} from "../models/InterfacesGlobal";

export const doLogin = createAsyncThunk(
    'doLogin',
    async (userData: ILoginData, thunkAPI) => {
        try {
            const state: any = thunkAPI.getState();
            const {setAuthorizedUser} = userSlice.actions;
            const MOCKED_USER = JSON.parse(sessionStorage.getItem('mocked_user'));

            authAPI
                .login(userData)
                .then((data) => {
                    sessionStorage.setItem('refresh_token', '');
                    sessionStorage.setItem('access_token', '');

                    state.authorizedUser = userData.email;
                    alert(`Welcome!`);

                })
                .catch((error) => {
                    const {email, password} = userData;

                    if (MOCKED_USER.email === email && MOCKED_USER.password === password) {
                        alert('Successfully logged in');
                        thunkAPI.dispatch(setAuthorizedUser(email));

                    } else {
                        alert('Wrong email or password');
                        thunkAPI.dispatch(setAuthorizedUser(null));
                        console.error(error)
                    }
                })

        } catch (e) {
            return thunkAPI.rejectWithValue('Failed request');
        }
    }
)


export const getResetPasswordLink = createAsyncThunk(
    'getResetPasswordLink',
    async (resetPasData: IResetPassword, thunkAPI) => {
        const MOCKED_USER = JSON.parse(sessionStorage.getItem('mocked_user'));

        try {
            authAPI
                .resetPassword({email: 'email', redirect_url: ''})
                .then((data) => {
                    alert(`Password link had been sent!`);

                })
                .catch((error) => {
                    const {email, redirect_url, navigate} = resetPasData;

                    if (MOCKED_USER.email === email) {
                        alert(`Password link had been sent!`);
                        navigate(redirect_url);

                    } else {
                        alert('User not found');
                        console.error(error)
                    }
                })

        } catch (e) {
            return thunkAPI.rejectWithValue('Failed request');
        }
    }
)

export const setNewPassword = createAsyncThunk(
    'setNewPassword',
    async (newPassData: ISetPassword, thunkAPI) => {
        const MOCKED_USER = JSON.parse(sessionStorage.getItem('mocked_user'));

        try {
            authAPI
                .setNewPassword(newPassData)
                .then((data) => {
                    alert(`Password had been successfully reset!`);

                })
                .catch((error) => {
                    const {token, secret, password, password_confirm, navigate} = newPassData;

                    if (password !== MOCKED_USER.password) {
                        alert("Your password had been successfully reset");
                        sessionStorage.setItem('mocked_user', JSON.stringify({email: 'admin@ua.ua', password}))
                        navigate('/');
                    }

                    if (password === MOCKED_USER.password) {
                        alert('Your new password is such as an old password, please come up with a new password')
                    }
                })

        } catch (e) {
            return thunkAPI.rejectWithValue('Failed request');
        }
    }
)