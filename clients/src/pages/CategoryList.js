import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';

export default function CategoryList() {
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState([]);
    const [cart,setCart] = useCart()
    const params = useParams();
    const navigate = useNavigate();
    const getProductsByCat =async() =>{
        try{
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
       if(params?.slug) getProductsByCat()
    },[params?.slug])
  return (
    <Layout>
        <div className="container mt-2">
            <h3 className='text-center'>{category?.name}</h3>    
            <h6 className='text-center'>{products?.length} products found</h6>    
            <div className="row">
            <div className="d-flex flex-wrap">
            {products?.map(p =>(
                <div className="card m-3" style={{ width: '18rem' }} >
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top prod-img" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title text-center">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}....</p>
                        <p className="card-text">₹ {p.price}</p>
                        <button class="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>DETAILS</button>
                        <button class="btn btn-dark ms-1"  onClick={()=> {
                          setCart([...cart,p]);
                          localStorage.setItem('cart',JSON.stringify([...cart,p]));
                          toast.success('Item added to Cart');
                          }}>ADD TO CART</button>
                    </div>
                </div>
            ))}
          </div>
            </div>
        </div> 
    </Layout>
  )
}
