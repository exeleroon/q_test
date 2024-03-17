import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import TextField from "../../components/TextField";
import {userSlice} from "../../store/reducers/UsersReducer";
import {LOGIN_STEP} from "../../components/Globals";
import LoginServices from "../../components/LoginServices";
import Delimeter from "../../components/Delimeter";
import {required, validateEmail} from "../../utils/validators/validators";
import LoginForm from "./LoginForm";
import MainContainer from "../../components/MainContainer";


const Login = () => {
    const dispatch = useAppDispatch();
    const {setPreLoginEmail, doLogout} = userSlice.actions;
    const {loginStep, authorizedUser} = useAppSelector(state => state.usersReducer);

    const [params, setParams] = useState({
        email: null
    });
    const [touched, setTouched] = useState({
        email: false,
    });
    const [errors, setErrors] = useState<any>({});

    const handleBlur = event => {
        const name = event.target.name;
        setTouched(touched => ({...touched, [name]: true}))
    }

    const changeParam = (e) => {
        const name = e.target.name;
        setParams(params => ({...params, [name]: e.target.value}));
    }

    const validateFields = () => {
        const {email} = params;
        setErrors({});

        if (!email || validateEmail(email)) {
            setErrors(valid => ({
                ...valid,
                ['email']: !params.email ? required(params.email) : validateEmail(params.email)
            }));
        }
    }

    const doSubmitEmail = (e) => {
        e.preventDefault();

        setTouched(touched => ({...touched, email: true}));

        if (errors.email) {
            return;
        }
        dispatch(setPreLoginEmail(params.email));
    }

    useEffect(() => {
        validateFields();
    }, [params])

    const logout = () => {
        dispatch(doLogout(null));
    }

    return (
        <MainContainer>
            {!authorizedUser ? <div className={'form-container'}>
                    <h2 className={'h2 mb5'}>Log in to your account</h2>

                    <LoginServices/>
                    <Delimeter/>

                    {loginStep === LOGIN_STEP.enterEmail ? <form onSubmit={doSubmitEmail}>
                            <TextField
                                className={'mb5'}
                                name={'email'}
                                placeholder={'Work email'}
                                onChange={changeParam}
                                onBlur={handleBlur}
                                errorMessage={touched.email && errors?.email}
                            />
                            <button className={'btn btn-blue'}>
                                Log in to Quencode
                            </button>
                        </form>
                        :
                        <LoginForm email={params.email} emailTouched={touched.email}/>
                    }
                </div>
                :
                <div className={'form-container'}>
                    <h2 className={'h2 mb5'}>Welcome admin</h2>

                    <button onClick={() => logout()} className={'btn btn-blue'}>
                        Logout
                    </button>
                </div>
            }
        </MainContainer>
    );
};

export default Login;