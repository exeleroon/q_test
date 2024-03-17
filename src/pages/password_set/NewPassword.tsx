import React, {useEffect, useState} from 'react';
import TextField from "../../components/TextField";
import {minLength, required} from "../../utils/validators/validators";
import MainContainer from "../../components/MainContainer";
import {setNewPassword} from "../../store/ActionCreators";
import {useAppDispatch} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";

const NewPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [params, setParams] = useState({
        password: null,
        confirmPassword: null
    });
    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false
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
        const {password, confirmPassword} = params;
        setErrors({});
        minLength(password, 8)

        if (!password || minLength(password, 8)
            || !confirmPassword || minLength(confirmPassword, 8)) {

            setErrors(valid => ({
                ...valid,
                ['password']: !password ? required(password) : minLength(password, 8),
                ['confirmPassword']: !confirmPassword ? required(confirmPassword) : minLength(confirmPassword, 8)
            }));
        }

        if (password !== confirmPassword && Object.keys(errors).length === 0) {
            setErrors(valid => ({
                ...valid,
                ['confirmPassword']: 'Passwords are not the same'
            }));
        }
    }

    useEffect(() => {
        validateFields();
    }, [params])

    const resetPassword = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
            return;
        }
        dispatch(setNewPassword({
            token: null,
            secret: null,
            password: params.password,
            password_confirm: params.confirmPassword,
            navigate
        }));
    }

    console.log(errors)

    return (
        <MainContainer>
            <div className={'form-container'}>
                <h2 className={'h2 mb4'}>
                    Create new Password?
                </h2>

                <form onSubmit={resetPassword}>
                    <TextField
                        label={'Password'}
                        name={'password'}
                        className={'mb3'}
                        onBlur={handleBlur}
                        type={'password'}
                        checkPassword
                        onChange={changeParam}
                        errorMessage={touched.password && errors?.password}
                    />
                    <TextField
                        label={'Confirm Password'}
                        name={'confirmPassword'}
                        className={'mb3'}
                        type={'password'}
                        checkPassword
                        onBlur={handleBlur}
                        onChange={changeParam}
                        errorMessage={touched.confirmPassword && errors?.confirmPassword}
                    />

                    <button className={'btn btn-blue'}>
                        Reset Password
                    </button>
                </form>
            </div>
        </MainContainer>
    );
};

export default NewPassword;