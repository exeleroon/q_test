import React, {useEffect, useState} from 'react';
import TextField from "../../components/TextField";
import {NavLink} from "react-router-dom";
import {minLength, required, validateEmail} from "../../utils/validators/validators";
import {doLogin} from "../../store/ActionCreators";
import {useAppDispatch} from "../../hooks/redux";

const LoginForm = ({email, emailTouched}) => {
    const dispatch = useAppDispatch();

    const [params, setParams] = useState({
        email: email,
        password: null
    });
    const [touched, setTouched] = useState({
        email: emailTouched,
        password: false,
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
        const {email, password} = params;
        setErrors({});

        if (!email || validateEmail(email)) {
            setErrors(valid => ({
                ...valid,
                ['email']: !params.email ? required(params.email) : validateEmail(params.email)
            }));
        }

        if (!password || minLength(password, 8)) {
            setErrors(valid => ({
                ...valid,
                ['password']: !params.password ? required(params.password) : minLength(params.password, 8)
            }));
        }
    }

    const loginIn = (e) => {
        e.preventDefault();

        setTouched(touched => ({...touched, password: true}));
        validateFields();

        if (Object.keys(errors).length > 0) {
            return;
        }
        dispatch(doLogin(params));
    }

    useEffect(() => {
        validateFields();
    }, [params])

    return (
        <form onSubmit={loginIn}>
            <TextField
                name={'email'}
                className={'mb2'}
                onBlur={handleBlur}
                value={params.email}
                onChange={changeParam}
                errorMessage={touched.email && errors?.email}
            />
            <TextField
                name={'password'}
                className={'mb2'}
                type={'password'}
                checkPassword
                onBlur={handleBlur}
                onChange={changeParam}
                errorMessage={touched.password && errors?.password}
            />

            <p className={'forgot-password mb3'}>
                <NavLink to={'/forgot-password'}>Forgot your password?</NavLink>
            </p>

            <button className={'btn btn-blue'}>
                Log in to Quencode
            </button>
        </form>
    );
};

export default LoginForm;