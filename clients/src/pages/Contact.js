import React,{useState} from 'react'
import Layout from '../components/Layout'
import { BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi'
import toast from 'react-hot-toast';

export default function Contact() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [query,setQuery] = useState('');

  const handleSubmit = () => {
    try{
      setName('');
      setEmail('');
      setQuery('');
      toast.success('Query Submitted Successfully');
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <>
    <Layout title={"Contact us - EzBuyHub"}>
    <div className="row bg-dark">
      <div className="col-md-8">
          <div className="text-white">
            <h1 className='m-3 text-center mb-4'>Contact Us</h1>
            
           <h2 className='ml-3'>
            <BiMailSend/> : Query@EzByuHub.com
          </h2>
           <h2 className='ml-3'>
            <BiPhoneCall/> : 8889997777
          </h2>
           <h2 className='ml-3'>
            <BiSupport/> : 0186-221862
          </h2>
          </div>
        </div>
        <div className="col-md-4">
        <img src='/images/img1_contact.jpg' className="card-img-top m-4" />
        </div>
        </div>

        <div className="row">
            <div className="col-md-7 bg-light">
            <div className="row p-4">
          <div className="card bg-light m-2" style={{width: '22rem'}}>
            <div className="text-center">
          <img src='/images/img2_contact.jpg' className="card-img-top prod-img-5 m-2" />
            </div>
            <div className="card-body text-center">
              <h3 className="card-title text-success">Service Quality</h3>
              <p className="card-text">We assure you to provide best costumer service.</p>
            </div>
          </div>
          <div className="card bg-light m-2" style={{width: '22rem'}}>
            <div className="text-center">
          <img src='/images/img3_contact.jpg' className="card-img-top prod-img-5 m-2" />
            </div>
            <div className="card-body text-center">
              <h3 className="card-title text-success">Quick responses</h3>
              <p className="card-text">We Assure you with fast queries solution</p>
            </div>
          </div>
          </div>
            </div>
            <div className="col-md-5 mt-4 p-4">
                  <div className='mb-3'>
                    <input type='text' value={name} placeholder='Enter Your name' className='form-control' onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <input type='text' value={email} placeholder='Enter Your Email' className='form-control' onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div className='mb-4'>
                    <textarea type='text' value={query} placeholder='Enter Your Query' className='form-control' onChange={(e) => setQuery(e.target.value)}/>
                  </div>
                  <div className='mb-3 mt-4 text-center'>
                    <button className='btn btn-dark ' onClick={handleSubmit}>Submit</button>
                  </div>
            </div>
        </div>
    </Layout>
    </>
  )
}
