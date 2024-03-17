import React, {useEffect, useState} from 'react';
import {required, validateEmail} from "../../utils/validators/validators";
import TextField from "../../components/TextField";
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import {useAppDispatch} from "../../hooks/redux";
import {getResetPasswordLink} from "../../store/ActionCreators";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>('');
    const [touchedEmail, setEmailTouched] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({});

    const validateFields = () => {
        setErrors({});
        if (!email || validateEmail(email)) {
            setErrors({email: !email ? required(email) : validateEmail(email)});
        }
    }

    const getResetLink = (e) => {
        e.preventDefault();

        setEmailTouched(true);

        if (errors.email) {
            return;
        }
        dispatch(getResetPasswordLink({email, redirect_url: '/password-set', navigate}));
    }

    useEffect(() => {
        validateFields();
    }, [email])

    const cancelResetPass = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <MainContainer>
            <div className={'form-container'}>
                <h2 className={'h2 mb4'}>
                    Forgot Password?
                </h2>

                <form onSubmit={getResetLink}>
                    <TextField
                        className={'mb4'}
                        name={'email'}
                        placeholder={'Enter your email'}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        errorMessage={touchedEmail && errors?.email}
                    />
                    <button className={'btn btn-blue'}>
                        Send
                    </button>
                    <button onClick={cancelResetPass} className={'btn'}>
                        Cancel
                    </button>
                </form>
            </div>
        </MainContainer>
    )
};

export default ForgotPassword;