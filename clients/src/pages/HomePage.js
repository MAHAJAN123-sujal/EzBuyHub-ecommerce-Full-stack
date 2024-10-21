import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Checkbox, Radio} from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';

export default function HomePage() {
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const [cart,setCart] = useCart();
  const navigate = useNavigate();

// to get all the categories
const getAllCategory = async (req, res) => {
  try {
      const { data } = await axios.get('/api/v1/category/all-category')
      if (data?.success) {
          setCategories(data.category);
      }
  }
  catch (error) {
      console.log(error);
      toast.error('Unable to fetch category');
  }
};

useEffect(() => {
  getAllCategory()
}, [])

// to get all the products
const getAllProducts = async() =>{
  try{
    setLoading(true);
    const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts(data.products);
  }
  catch(error){
    console.log(error);
    setLoading(false);
    toast.error('Unable to get all products');
  }
}

useEffect(()=>{
  if(!checked.length || !radio.length) getAllProducts();
},[checked.length,radio.length]);

useEffect(()=>{
  if(checked.length || radio.length) filterProduct();
},[checked,radio]);

//  to get total count
const getTotal = async() =>{
  try{
  const {data} = await axios('/api/v1/product/product-count');
  setTotal(data?.total);
  }
  catch(error){
    console.log(error);
  }
}

useEffect(() => {
  getTotal();
},[])


// filter by category
const handleFilter = (value,id) =>{
  try{
    let all = [...checked];
    if(value){
      all.push(id);
    }
    else{
      all = all.filter(c =>c!==id);
    }
    setChecked(all);
  }
  catch(error){
    console.log(error);
    toast.error('Unable to filter categories');
  }
}

// to get filters on products displayed
const filterProduct = async() =>{
  try{
    const {data} = await axios.post('/api/v1/product/products-filter',{checked,radio});
    setProducts(data?.products);
  }
  catch(error){
    console.log(error);
  }
}

// to load more
const loadMore = async() =>{
  try{
    setLoading(true);
    const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts([...products, ...data?.products])
  }
  catch(error){
    console.log(error);
    setLoading(false);
  }
}

useEffect(()=>{
  if(page===1) return;
  loadMore();
},[page]);

  return (
    <>
    <Layout title={"EzBuyHub - Upto 50% off"}>
       <div className="row mt-3">
        <div className="col-md-3">
            <h4 className="text-center">Filter by category</h4>
            <div className="d-flex flex-column p-3">
              {categories?.map((c) =>(
                  <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked,c._id)}>
                    {c.name}
                  </Checkbox>
                ))}
            </div>
            <hr/>
            <h4 className="text-center mt-5">Filter by Price</h4>
            <div className="d-flex flex-column p-3">
                <Radio.Group onChange={e => setRadio(e.target.value)}>
                  {Prices?.map(p =>(
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                    ))}
                </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button className='btn btn-primary m-3' onClick={() => window.location.reload()}>Reset Filters</button>
            </div>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map(p =>(
                <div className="card m-3" style={{ width: '18rem' }} >
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top prod-img" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title text-center">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}....</p>
                        <p className="card-text text-center text-success font-weight-bold">₹ {p.price}</p>
                        <button class="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>DETAILS</button>
                        <button class="btn btn-dark ms-1" onClick={()=> {
                          setCart([...cart,p]);
                          localStorage.setItem('cart',JSON.stringify([...cart,p]));
                          toast.success('Item added to Cart');
                          }}>
                            ADD TO CART
                        </button>
                    </div>
                </div>
            ))}
          </div>
          <div className='m-3 p-3 text-center'>
            {products && products.length<total && (
                <button className='btn btn-warning' onClick={(e)=>{
                  e.preventDefault();
                  setPage(page+1);
                }}>{loading ? 'loading...' : 'Load More'}</button>
              )}
          </div>
        </div>
       </div>
    </Layout>
    </>
  )
}
