import { useAuth } from '@/context/authContext';
import  api from '@/utils/api';
import axios from 'axios';


import React, { useEffect } from 'react'

export default function Home() {
  const { user, login, logout,refreshToken,eror } = useAuth(); 


  return (
    <div>
        <div>
  
        </div>

    </div>
  )
}
