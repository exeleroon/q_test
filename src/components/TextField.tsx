import React, {useState} from 'react';
import {ITextField} from "../models/InterfacesGlobal";

const TextField = ({label, name, type, className, placeholder, onBlur, value, onChange, checkPassword, errorMessage}: ITextField) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`textField  ${className ? className : ''}`}>
            {label && <label className={'textField__label'} htmlFor={name}>{label}</label>}
            <div className={'textField__input-container'}>
                <input
                    className={`textField__input`}
                    name={name}
                    type={type && !showPassword ? type : 'text'}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    defaultValue={value}
                />
                {checkPassword && <span onClick={() => setShowPassword(!showPassword)} className={'textField__eye-icon'}/>}
            </div>
            {errorMessage && (
                <div className={'textField__error'}>{errorMessage}</div>)}
        </div>
    );
};

export default TextField;