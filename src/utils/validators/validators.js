export const required = (value, label = 'Field is required') => {

    if (!isNilOrEmptyString(value)) return undefined;
    return label;
};

export const isNilOrEmptyString = (value) => value === undefined || value === null || value === '';

export const validateEmail = (email, label = 'Email is incorrect') => {
    if (required(email) !== undefined) {
        return required(email);
    } else {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) return undefined;
        return label;
    }
};

export const minLength = (value, min) =>
    value?.toString().length < min ? `Must be at least ${min} characters` : undefined;


export const is = {
    required: () => (value) => isNilOrEmptyString(value) && 'This field is required',

    minLength: (min) => (value) => !!value && value.length < min && `Must be at least ${min} characters`,

    maxLength: (max) => (value) => !!value && value.length > max && `Must be at most ${max} characters`,

    email: () => (value) => !!value && !/.+@.+\..+/.test(value) && 'Must be a valid email',

    notEmptyArray: () => (value) =>
        Array.isArray(value) && value.length === 0 && 'Please add at least one item'
};
