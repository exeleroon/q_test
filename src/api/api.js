import Axios from 'axios';

const api = Axios.create({
    baseURL: 'https://auth-qa.qencode.com/v1',
    withCredentials: true,
});

export const authAPI = {
    async resetPassword({ email, redirect_url }) {
        const response = await api.post(`/auth/password-reset`, { email, redirect_url });
        return response.data;
    },
    async setNewPassword({ token, secret, password, password_confirm }) {
        const response = await api.post(`/auth/password-set`, { token, secret, password, password_confirm });
        return response.data;
    },
    async getAccessToken() {
        const response = await api.get(`/auth/access-token`);
        return response.data;
    },
    async getRefreshToken() {
        const response = await api.get(`/auth/refresh-token`);
        return response.data;
    },
    async login({ email, password }) {
        const response = await api.post(`/auth/login`, { email, password });
        return response.data;
    },
    async logout() {
        const response = await api.post(`/auth/logout`);
        return response.data;
    }
};
