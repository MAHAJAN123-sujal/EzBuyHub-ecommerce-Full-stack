import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom';
export default function Search() {
  const [values,setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={'Search results'}>
        <div className="container">
          <div className="text-center">
            <h2>Search results</h2>
            <h6>{values?.result.length<1 ? 'No Products Found' : `Found ${values?.result.length} Products`}</h6>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap mt-3">
            {values?.result.map(p =>(
                <div className="card m-3" style={{ width: '18rem' }} >
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top prod-img" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title text-center">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}....</p>
                        <p className="card-text">₹ {p.price}</p>
                        <button class="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>DETAILS</button>
                        <button class="btn btn-dark ms-1">ADD TO CART</button>
                    </div>
                </div>
            ))}
          </div>



          </div>
        </div>
      
    </Layout>
  )
}
