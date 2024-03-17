import {createSlice} from "@reduxjs/toolkit";
import {LOGIN_STEP} from "../../components/Globals";

export interface IUser {
    name: string;
    username: string;
    password?: string;
    token: string;
}

export interface IFormState {
    loginStep: number;
    preLoginEmail: string;
    authorizedUser: IUser;
    isLoading: boolean;
    error: string;
}

const initialState: IFormState = {
    loginStep: LOGIN_STEP.enterEmail,
    preLoginEmail: null,
    authorizedUser: null,
    isLoading: false,
    error: null
}


export const userSlice = createSlice({
    name: 'images_slice',
    initialState,
    reducers: {
        setAuthorizedUser(state, action) {
            state.authorizedUser = action.payload;
        },
        setPreLoginEmail(state, action) {
            state.preLoginEmail = action.payload;
            state.loginStep = LOGIN_STEP.loginForm;
        },
        // signUpUser(state, action) {
        //     let newUser: IUser = null;
        //     const generatedToken = Math.random().toString(36).substring(2);
        //     newUser = {
        //         token: generatedToken,
        //         name: action.payload.name,
        //         username: action.payload.username,
        //         password: action.payload.password
        //     }
        //     state.signedUsers.push(newUser);
        // },
        doLogout(state, action) {
            sessionStorage.removeItem('refresh_token');
            sessionStorage.removeItem('access_token');
            state.authorizedUser = null;
        }
    }
})

export default userSlice.reducer;