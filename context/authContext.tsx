import React, { createContext, useState, useContext, useEffect } from 'react';
import CryptoJS from 'crypto-js'; 

import { useRouter } from 'next/router';
import api from '@/utils/api';


type UserData = {
  refreshedTokens: string;
  accessToken: string;
  role:string[]
};
type UserLogin={
  email: string,
  password: string
}
type Erorr = {
  statusCode: number;
  message: string;
};

type EncryptedUserData = {
  encryptedData: string;
};

type AuthContextType = {
  user: UserData | null;
  eror:Erorr | null;
  login: (userLogin: UserLogin) => void;
  logout: () => void;
  refreshToken: () => void;
};

const secretKey = 'webconsole-studio-secretKey'; 

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const encryptData = (data: UserData, key: string): EncryptedUserData => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return { encryptedData };
};

const decryptData = (encryptedData: EncryptedUserData, key: string): UserData => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData.encryptedData, key).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [eror, setEror] = useState<Erorr | null>(null);
  useEffect(() => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      const decryptedData = decryptData(JSON.parse(storedData), secretKey);
      setUser(decryptedData);
    }
    if (!storedData) {
      router.push('/auth/login'); 
    }
  }, []);

  const login = (userLogin: UserLogin) => {
    api.post('/identity/AuthCourier/LoginCourier', {
      email: userLogin.email,
      password:userLogin.password ,
    })
    .then(response => {
 
      
      if (response.status===200) {
        router.push('/');
        const userData = {
          refreshedTokens: response.data.data.token.refreshToken,
          accessToken: response.data.data.token.accessToken,
          role:["salam"]
        };
        const encryptedUserData = encryptData(userData, secretKey);
        setUser(userData);
        localStorage.setItem('auth', JSON.stringify(encryptedUserData));
      }
      
     
    })
    .catch(error => {
      if (error && error.response) {
        const Erorr = {
          statusCode: error.response.status,
          message: error.response.data.message || '',
        };
        setEror(Erorr);
      }
    });
  };

 const refreshToken = async () => {
    return new Promise((resolve, reject) => {
      api.post('/identity/AuthCourier/RefreshTokenLogin', {
        refreshToken: user?.refreshedTokens
      })
      .then(response => {
        const userData = {
          refreshedTokens: response.data.data.token.refreshToken,
          accessToken: response.data.data.token.accessToken,
          role: [""] 
        };
        const encryptedUserData = encryptData(userData, secretKey);
        setUser(userData);
        localStorage.setItem('auth', JSON.stringify(encryptedUserData));
        const user = response.data.data.token.accessToken;
        resolve(user); 
      })
      .catch(error => {
        logout(); 
        router.push('/auth/login');
        reject(error); 
      });
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth');
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user,eror, refreshToken,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
