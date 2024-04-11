import { refreshToken } from '@/context/refresToken';
import axios, { AxiosError } from 'axios';


const api = axios.create({
  baseURL: 'https://cafetti.az/api',

});

api.interceptors.response.use(
  response => response, 
  async (error: AxiosError) => {

    if (error.response && error.response.status === 401) {
      try {
        const users= localStorage.getItem('refres')
        const refreshedToken = await refreshToken(users as string);
        const originalRequest = error.response.config;
        originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);


export default api;
