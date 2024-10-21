import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

export default function Categories() {
  const categories = useCategory();
  return (
    <Layout title={'All Categories'}>
        <div className="container">
          <div className="row">
            {categories?.map((c)=>(
              <div className="col-md-6 mt-4 mb-2 gx-2 gy-2 p-4" key={c._id}>
                  <Link className='btn btn-dark  btn-modify' to={`/category/${c.slug}`}>{c.name}</Link> 
              </div>
            ))}
            
          </div>
        </div>
    </Layout>
  )
}
