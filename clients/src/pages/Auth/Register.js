import React, {useState} from 'react';
import Layout from '../../components/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "../../styles/AuthStyle.css";


export default function Register() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [question,setQuestion] = useState("");
    const navigate = useNavigate();

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        try{
                //  connecting and checking all from AuthoriseController file
            const res = await axios.post("/api/v1/auth/register",{name,email,password,phone,address,question});
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
    <Layout title={"Sign Up - EzBuyHub"}>
        <div className='form-container' style={{minHeight:"90vh"}}>

            <form onSubmit={handleOnSubmit}>
            <h3 className='title text-center'>SIGN UP</h3>
            <div className="mb-2">
                <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter Name' required/>         
            </div>
            <div className="mb-2">
                <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email Address' required/>
            </div>
            <div className="mb-2">
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Password' required/>
            </div>
            <div className="mb-2">
                <input type="number" value={phone} onChange={(e)=> setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='Enter Phone Number' required/>
            </div>
            <div className="mb-2">
                <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter Address' required/>
            </div>
            <div className="mb-4">
                <input type="text" value={question} onChange={(e)=> setQuestion(e.target.value)} className="form-control" id="exampleQuestion" placeholder="What's your Fav Dish" required/>
            </div>
            <div className='text-center'>
                <button type="submit" className="btn btn-dark ">SIGN UP</button>
            </div>
            </form>
        </div>
    </Layout>
    </>
  )
}
