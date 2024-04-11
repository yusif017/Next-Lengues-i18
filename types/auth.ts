export type UserData = {
    refreshedTokens: string;
    accessToken: string;
    role:string[]
  };
  export type UserLogin={
    email: string,
    password: string
  }
  export type Erorr = {
    statusCode: number;
    message: string;
  };
  
  export type EncryptedUserData = {
    encryptedData: string;
  };
  
  export type AuthContextType = {
    user: UserData | null;
    eror:Erorr | null;
    login: (userLogin: UserLogin) => void;
    logout: () => void;
  };
  