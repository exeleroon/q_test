export interface IError {
    error: {
        data: string;
        status: string;
        error: string;
        originalStatus: number;
    }
}

export interface ITextField {
    label?: string;
    name: string;
    className?: string;
    placeholder?: string;
    checkPassword?: boolean;
    onChange: (e) => any;
    onBlur: (e) => any;
    type?: string;
    errorMessage?: any;
    value?: any;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IResetPassword {
    email: string;
    redirect_url: string;
    navigate: any;
}

export interface ISetPassword {
    token: string;
    secret: string;
    password: string;
    password_confirm: string;
    navigate: any;
}
