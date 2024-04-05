
import { useAuth } from "@/context/authContext";
import { useState } from "react";
export default function Login() {
  const {login,eror } = useAuth(); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    const userLogin = {
      email: email,
      password: password,
    };
      login(userLogin);
  };
  

  return (
 <>
 <div className='login-form'>
<p className="text-xs mb-3 text-white">{eror?.message}</p>
  <div className="flex-row">
   
    <input required id="username" value={email} onChange={e=>setEmail(e.target.value)} className='lf--input' placeholder='Username' type='text'/>
  </div>
  <div className="flex-row">
   
    <input required id="password" value={password} onChange={e=>setPassword(e.target.value)}  className='lf--input' placeholder='Password' type='password'/>
  </div>
  <button className='lf--submit' onClick={handleLogin}>LOGIN</button>
</div>

 </>
  )
}
