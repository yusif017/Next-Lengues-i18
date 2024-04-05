import axios, { AxiosError } from 'axios';

// Axios istemcisini oluştur
const api = axios.create({
  baseURL: 'https://cafetti.az/api',
  // Diğer axios yapılandırmalarını buraya ekleyebilirsiniz
});

// // Axios interceptor'ları tanımlama
// api.interceptors.response.use(
//   response => response, // Başarılı yanıtları doğrudan geçir
//   async (error: AxiosError) => {
//     if (error.response && error.response.status === 401) {
//       try {
//         // Oturumu yenileme işlemini gerçekleştir
//         const refreshedToken = await refreshToken();

//         // Yenilenmiş token ile isteği tekrar gönder
//         const originalRequest = error.response.config;
//         originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
        
//         // İsteği tekrar gönder
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Oturum yenileme başarısız oldu
//         return Promise.reject(refreshError);
//       }
//     }
//     // 401 haricindeki hataları doğrudan geçir
//     return Promise.reject(error);
//   }
// );


export default api;
