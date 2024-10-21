import React, {useState} from 'react';
import Layout from '../../components/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import "../../styles/AuthStyle.css";
import { useAuth } from '../../context/auth';

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  const location = useLocation();
  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try{
            //  connecting and checking all from AuthoriseController file
        const res = await axios.post(`/api/v1/auth/login`,{email,password});
        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state || '/');
        }
        else{
            toast.error(res.data.message);
        }
    }
    catch(error){
        console.log(error);
        toast.error("Something Went Wrong")
    }
}

  return (
    <>
    <Layout title={"Login - EzBuyHub"}>
    <div className='form-container' style={{minHeight:"90vh"}}>
      <form onSubmit={handleOnSubmit}>
      <h3 className='title text-center mb-4'>LOGIN</h3>
      <div className="mb-2 mt-5">
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email Address' required/>
      </div>
      <div className="mb-2 mt-4">
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Password' required/>
      </div>
      <div className='text-center mt-5'>
          <button type="submit" className="btn btn-dark ">LOGIN</button>
      </div>
      <div className='mb-2 mt-2'>
        <div className='text-center mt-5'>
            <button type="submit" className="btn btn-primary " onClick={()=>{navigate('/forgot-password')}}>FORGOT PASSWORD</button>
        </div>
      </div>
      </form>
</div>
    </Layout>
    </>
  )
}
