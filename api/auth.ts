import axios from '@utils/axios';

const baseApi = '/baseApi/auth/';

export { ApiGetCookie } from '@utils/axios';

export const ApiSendEmail = (email: string) => axios.post(baseApi + 'sendEmail', { email });

export const ApiLogin = (email: string, pass: string) => axios.post(baseApi + 'login', { email, pass });

export const ApiRegister = (email: string, pass: string, code: string) => axios.post(baseApi + 'register', { email, pass, code });
