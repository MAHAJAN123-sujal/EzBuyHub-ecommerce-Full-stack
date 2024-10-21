import React, {useState} from 'react';
import Layout from '../../components/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "../../styles/AuthStyle.css";

export default function ForgotPassword() {
  const [email,setEmail] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [question,setQuestion] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try{
            //  connecting and checking all from AuthoriseController file
        const res = await axios.post("/api/v1/auth/forgot-password",{email,newPassword,question});
        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            navigate('/login');
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
      <Layout title={"Reset Password - EzBuyHub"}>
        <div className='form-container' style={{minHeight:"90vh"}}>
            <form onSubmit={handleOnSubmit}>
                <h3 className='title text-center mb-4'>RESET PASSWORD</h3>
                <div className="mb-2 mt-5">
                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email Address' required/>
                </div>
                <div className="mb-2">
                    <input type="text" value={question} onChange={(e)=> setQuestion(e.target.value)} className="form-control" id="exampleQuestion" placeholder="What's Your fav Dish" required/>
                </div>
                <div className="mb-5">
                    <input type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter New Password' required/>
                </div>
                <div className='text-center mt-5'>
                    <button type="submit" className="btn btn-primary ">RESET PASSWORD</button>
                </div>
            </form>
        </div>
      </Layout>
    </>
  )
}
