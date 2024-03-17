import React from 'react';
import githubIcon from '../assets/github_logo.svg';
import googleIcon from '../assets/google_logo.svg';


const LoginServices = () => {
    return (
        <div className={'login-services'}>
            <button className={'btn m0'}>
                <div className={'login-services__logo-text'}>
                    <img src={googleIcon} alt={'google-icon'}/>
                    <span>Google</span>
                </div>
            </button>
            <button className={'btn m0'}>
                <div className={'login-services__logo-text'}>
                    <img src={githubIcon} alt={'github-icon'}/>
                    <span>GitHub</span>
                </div>
            </button>
        </div>
    );
};

export default LoginServices;