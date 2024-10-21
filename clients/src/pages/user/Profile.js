import React,{useEffect,useState} from 'react';
import UserMenu from '../../components/UserMenu';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Profile() {
  // context
  const [auth,setAuth] = useAuth();

  //states
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try{
            //  connecting and checking all from AuthoriseController file
        const {data} = await axios.put("/api/v1/auth/profile",{name,email,password,phone,address});

        if(data?.error){
          toast.error(data?.error);
        }
        else{
          setAuth({...auth, user:data?.updatedUser})
          let localst = localStorage.getItem('auth');
          localst = JSON.parse(localst);
          localst.user = data.updatedUser;
          localStorage.setItem('auth',JSON.stringify(localst));
          toast.success('Profile Updated Successfully');
        }
    }
    catch(error){
        console.log(error);
        toast.error("Something Went Wrong")
    }
}

// to get user data at initial time
useEffect(()=>{
  const {name,email,phone,address} = auth?.user;
  setName(name);
  setPhone(phone);
  setEmail(email);
  setAddress(address);
},[auth?.user])
  return (
    <Layout title={'Your Profile - EzBuyHub'}>
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'>
            <div className='form-container text-center' style={{minHeight:"90vh"}}>
              <form onSubmit={handleOnSubmit}>
              <h3 className='title text-center'>User Profile</h3>
              <div className="mb-2">
                  <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter Name' />         
              </div>
              <div className="mb-2">
                  <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email Address'  disabled/>
              </div>
              <div className="mb-2">
                  <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Password' />
              </div>
              <div className="mb-2">
                  <input type="number" value={phone} onChange={(e)=> setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='Enter Phone Number' />
              </div>
              <div className="mb-2">
                  <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter Address' />
              </div>
              <div className='text-center'>
                  <button type="submit" className="btn btn-dark ">UPDATE</button>
              </div>
              </form>
            </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}
