import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://portal.fptb.edu.ng';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const sessionCookie = await AsyncStorage.getItem('PHPSESSID');
  if (sessionCookie) {
    config.headers.Cookie = `PHPSESSID=${sessionCookie}`;
  }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      const sessionCookie = setCookieHeader.find((cookie: string) =>
        cookie.startsWith('PHPSESSID')
      );
      if (sessionCookie) {
        const sessionId = sessionCookie.split(';')[0].split('=')[1];
        await AsyncStorage.setItem('PHPSESSID', sessionId);
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
