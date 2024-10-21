import React, { useState,useEffect } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropIn  from 'braintree-web-drop-in-react';
import toast from 'react-hot-toast';

export default function Cart() {
    const [cart,setCart] = useCart();
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState('')
    const [instance,setInstance] = useState('');
    const [loading,setLoading] = useState(false);

    // for total price amount of items in cart
    const totalPrice = () => {
        try{
            let total = 0;
            cart?.map(item => {
                total = total + item.price
            });
            return total;
        }
        catch(error){
            console.log(error);
        }
    }

    const RemoveCartItem = (pid) =>{
        try{
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id===pid);
            myCart.splice(index,1);
            setCart(myCart);
            localStorage.setItem('cart',JSON.stringify(myCart));
        }
        catch(error){
            console.log(error);
        }
    }

    const getToken = async() =>{
        try{
            const {data} = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getToken();
    },[auth?.token]);

    const handlePayment = async() => {
        try{
            const {nonce} = await instance.requestPaymentMethod();
            const {data} = await axios.post('/api/v1/product/braintree/payment',{nonce,cart});
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Order Placed Successfully');
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }
  return (
    <Layout>
        <div className="container">
            <div className="row">
                <div className="col-md-14">
                    <h1 className='text-center bg-light p-2 m-2'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>{cart?.length ? `You have ${cart?.length} items in cart ${auth?.token ? '': 'please Login to Check-out'}`:'Your cart is empty'}</h4>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-md-7 ">
                    {cart?.map((p) =>(
                        <div className="row m-2 card flex-row p-2 ">
                            <div className="col-md-3 m-1">
                            <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top prod-img-3 " alt={p.name} />
                            </div>
                            <div className="col-md-9 text-center ">
                                <h3>Product Name: {p.name}</h3>
                                <p>Details:{p.description.substring(0,30)}....</p>
                                <h4>Price:₹ {p.price}</h4>
                                <button className='btn btn-danger' onClick={() => RemoveCartItem(p._id)}>Remove Item</button>
                            </div>
                        </div>
                        ))}
                </div>
                <div className="col-md-4 text-center">
                    <button className='btn btn-dark mb-4'>Cart Summary</button>
                    <p>Total | CheckOut | Payment</p>
                    <hr/>
                    <h4>Total Amount: ₹ {totalPrice()}</h4>
                    {auth?.user?.address?(
                    <>
                    <div className="m-3">
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address}</h5>
                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>UPDATE ADDRESS</button>
                    </div>
                    </>
                    ):(
                        <div className="mb-3">
                            {auth?.token ? (
                                <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                            ) : (
                                <button className='btn btn-outline-dark' onClick={() => navigate('/login',{
                                    state:'/cart'
                                })}>Please Login to checkOut</button>
                            )}
                        </div>
                    )}
                    <div className="m-3">
                    {!clientToken|| !cart?.length ?('' ):(
                            <>
                            <DropIn
                         options={{ 
                            authorization:clientToken,
                            paypal:{
                                flow:'vault',
                            }
                        }}
                        onInstance={(instance) => setInstance(instance)}
                        />
                        <button className='btn btn-outline-success' onClick={handlePayment} disabled={loading ||!instance  || !auth?.user?.address}>

                            {loading? 'Processing...' : 'Proceed Payment'}
                        </button>
                            </>
                            )
                    }  
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
