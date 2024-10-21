import React,{useState,useEffect} from 'react';
import AdminMenu from '../../components/AdminMenu';
import Layout from '../../components/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]);

    // get All Products
    const getAllProducts = async() =>{
        try{
            const {data} = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);
        }
        catch(error){
            console.log(error);
            toast.error('Unable to fetch all Products');
        }
    }

    useEffect(()=>{
        getAllProducts();
    },[])
  return (
    <>
    <Layout>
     <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>All Product List</h1>
            <div className='d-flex flex-wrap'>
            {products?.map(p =>(
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                    <div className="card m-3" style={{ width: '18rem' }} >
                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top prod-img" alt={p.name} />
                        <div className="card-body">
                            <h5 className="card-title text-center">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}...</p>
                            <p className="card-text">₹ {p.price}</p>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    </div> 
    </Layout>
    </>
  )
}
