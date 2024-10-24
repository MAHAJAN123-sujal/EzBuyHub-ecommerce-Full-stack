import React,{useState,useEffect} from 'react';
import UserMenu from '../../components/UserMenu';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

const Orders = () => {
  const [orders,setOrders] = useState([]);
  const [auth,setAuth] = useAuth();

  const getOrders = async() =>{
    try{
      const {data} = await axios.get('/api/v1/auth/orders');
      setOrders(data);
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    if(auth?.token) getOrders();
  },[auth?.token]);
  return (
    <Layout title={'Your Orders - EzBuyHub'}>
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'>
             <h1 className='text-center'> All Orders</h1>
             {orders?.map((o,i) => {
              return(
                <div className="border shadow">
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Payment</th>
                        <th scope='col'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i+1}</th>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? ' Success' : 'Failed'}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="container">
                  {o?.products?.map((p,i) =>(
                        <div className="row m-2 card flex-row p-2 ">
                            <div className="col-md-2">
                            <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top prod-img-4 " alt={p.name} />
                            </div>
                            <div className="col-md-9 text-center ">
                                <h5>Product Name: {p.name}</h5>
                                <p>Details:{p.description.substring(0,30)}....</p>
                                <h5>Price:₹ {p.price}</h5>
                            </div>
                        </div>
                        ))}
                  </div>

                </div>
              )
            })}
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders;
