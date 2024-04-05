import Languages from '@/components/lang/Language';
import { useAuth } from '@/context/authContext';
export default function Home() {
  const { user, login, logout,refreshToken,eror } = useAuth(); 


  return (
    <div>
        <div>
  <Languages color='#000'/>
        </div>

    </div>
  )
}
