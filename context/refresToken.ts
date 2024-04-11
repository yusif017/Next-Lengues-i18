import api from "@/utils/api";
import { encryptData, secretKey } from "./authContext";

export const refreshToken = async (token:string|undefined) => {

    return new Promise((resolve, reject) => {
      api.post('/identity/AuthCourier/RefreshTokenLogin', {
        refreshToken: token
      })
      .then(response => {
        const userData = {
          refreshedTokens: response.data.data.token.refreshToken,
          accessToken: response.data.data.token.accessToken,
          role: [""] 
        };
        const encryptedUserData = encryptData(userData, secretKey);
        localStorage.setItem('auth', JSON.stringify(encryptedUserData));
        const user = response.data.data.token.accessToken;
        resolve(user); 
      })
      .catch(error => {
        reject(error); 
      });
    });
  };
  
