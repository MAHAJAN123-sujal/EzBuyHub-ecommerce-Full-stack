import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';

export default function ProductDetails() {
    const params = useParams();
    const [product,setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const [cart,setCart] = useCart();

    // to get similar products
    const getSimilarProduct = async(pid,cid) =>{
        try{
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products)
        }
        catch(error){
            console.log(error);
        }
    }

    // to get product
    const getProduct = async() =>{
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id,data?.product.category._id);
        }
        catch(error){
            console.log(error);

        }
    }

    useEffect(()=>{
        if(params?.slug) getProduct();
    },[params?.slug])
  return (
    <Layout>
       <div className="row container mt-3">
        <div className="col-md-7">
        <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top prod-img-2" alt={product.name} />
        </div>
        <div className="col-md-5 ">
            <h1 className='text-center'>Product Details</h1>
            <h5>Name: {product.name}</h5>
            <h5>Description: {product.description}</h5>
            <h5>Price: {product.price}</h5>
            <h5>Category: {product?.category?.name}</h5>
           <div className="text-center"><button class="btn btn-dark m-4 ms-1" onClick={()=> {
                setCart([...cart,product]);
                localStorage.setItem('cart',JSON.stringify([...cart,product]));
                toast.success('Item added to Cart');
                }}>ADD TO CART</button></div>
        </div>
       </div>
       <hr/>
       <div className="row m-3">
            <h1 className='text-center m-3'> Similar products</h1>
            <div className="d-flex flex-wrap">
            {relatedProducts?.map(p =>(
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
    </Layout>
  )
}
