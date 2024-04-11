import Languages from '@/components/lang/Language';
import { decryptData, secretKey, useAuth } from '@/context/authContext';
import { refreshToken } from '@/context/refresToken';
import api from '@/utils/api';
import { headers } from 'next/headers';
import { useEffect } from 'react';
export default function Home() {
  const { user, login, logout  } = useAuth(); 


const openKuryerPopup = () => {
    refreshToken(user?.refreshedTokens)
};


console.log(user);

// const getBasketData = async () => {

//   const response = await fetch(``, {
//     headers: {
//       "Authorization": `Bearer ${user?.token?.accessToken}`,
//     },
//   });
 
//   const data = await response.json();
//   if (response.status === 200) {

//   }



// };


// Örnek bir GET isteği
const fetchData = async () => {
  try {
    const response = await api.get('/basket/BasketTablet/GetAllBasketTable',{
      headers: {
        Authorization: `Bearer ${user?.accessToken}` // Token başlıkta "Authorization" olarak taşınıyor
      }
    });

    return response.data;
  } catch (error) {
    // Hata durumunda işlemler
    console.error('Veri alınamadı:', error);
    throw error; // Hata durumunu yukarıya iletiyoruz
  }
};

useEffect(() => {
  fetchData()
}, [user]);
 


  return (
    <div>
        <div>
  <Languages color='#000'/>
  
  <button onClick={openKuryerPopup}>test</button>
  <button onClick={fetchData}>test1</button>

        </div>

    </div>
  )
}
