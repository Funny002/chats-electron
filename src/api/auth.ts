import axios from '@u/axios';

const baseApi = '/api/auth/';

export const ApiGetCookie = () => axios.get('/api/cookie');

export const ApiLogin = (user: string, pass: string) => axios.post(baseApi + 'login', { user, pass });

export const ApiSendEmail = (user: string, email: string) => axios.post(baseApi + 'sendEmail', { user, email });

export const ApiRegister = (user: string, pass: string, email: string, code: string) => axios.post(baseApi + 'register', { user, email, pass, code });

export default { ApiLogin, ApiRegister, ApiSendEmail, ApiGetCookie };
