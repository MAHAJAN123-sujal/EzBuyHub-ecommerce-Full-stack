import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Select} from 'antd';
const {Option} = Select;
export default function UpdateProduct() {
    const navigate = useNavigate();
    const params = useParams();
    const [categories,setCategories] = useState([]);
    const [photo,setPhoto] = useState('');
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [quantity,setQuantity] = useState('');
    const [category,setCategory] = useState('');
    const [shipping,setShipping] = useState('');
    const [id,setId] = useState('');
    // to get single product
    const getSingleProduct = async()=>{
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setPhoto(data.product.photo);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
            setId(data.product._id);
        }
        catch(error){
            console.log(error);
            toast.error('unable to get the product');
        }
    }
    
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    },[])
    // to get all categories
    const getAllCategory = async (req, res) => {
      try {
          const { data } = await axios.get('/api/v1/category/all-category')
          if (data?.success) {
              setCategories(data?.category);
          }
      }
      catch (error){
          console.log(error);
          toast.error('Unable to fetch category');
      }
  };
  
  // to create product
  const handleUpdate = async(e) =>{
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append('name',name)
      productData.append('description',description)
      productData.append('price',price)
      productData.append('quantity',quantity)
      photo && productData.append('photo',photo)
      productData.append('category',category)
      const {data} = axios.put(`/api/v1/product/update-product/${id}`,productData);
      if(data?.success){
        toast.success(data?.message);
      }
      else{
        toast.success('Product Updated successfully');
        navigate('/dashboard/admin/products');
      }
    }
    catch(error){
      console.log(error);
      toast.error('Unable to create Product');
    }
  }
  useEffect(() => {
    getAllCategory()
  }, [])
  
  // to delete the product
  const handleDelete = async() => {
    try{
      let answer = window.prompt('Are you Sure, to delete the Product');
      if(!answer) return;
      const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success('Product deleted Successfully');
      navigate('/dashboard/admin/products');
    }
    catch(error){
      console.log(error);
      toast.error('Unable to delete the Product');
    }
  }
  return (
    <Layout title={'Dashborad - Create Products'}>
    <div className='container-fluid m-3 p-3'>
       <div className='row'>
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>Update product</h1>
                <div className='m-1 w-75'>
                  <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => {setCategory(value);}}
                  value={category}
                  >{categories?.map((c) => (
                    <Option key={c._id} value={c._id}>{c.name}</Option>))}</Select>

                  <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12'>
                      {photo ? photo.name: "Upload Photo"}
                      <input type='file' name='photo'accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                    </label>
                  </div>
                  <div className='mb-3'>
                      {photo ? (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='product photo' height={'200px'} className='img img-responsive'/>
                    </div>
                    ): (
                        <div className='text-center'>
                            <img src={`/api/v1/product/product-photo/${id}`} alt='product photo' height={'200px'} className='img img-responsive'/>
                        </div>
                    )}
                  </div>

                  <div className='mb-3'>
                    <input type='text' value={name} placeholder='Enter Product name' className='form-control' onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <textarea type='text' value={description} placeholder='Product Description...' className='form-control' onChange={(e) => setDescription(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <input type='number' value={price} placeholder='Product Price' className='form-control' onChange={(e) => setPrice(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <input type='number' value={quantity} placeholder='Products Quantity in Stock' className='form-control' onChange={(e) => setQuantity(e.target.value)}/>
                  </div>
                  <div className='mb-3'>
                    <Select bordered={false} placeholder="Select Shipping" size='large' className='form-select mb-3' onChange={(value) => {setShipping(value);
                    }}
                    value={shipping ? "Yes" : "No"}
                    >
                        <Option value='0'>NO</Option>
                        <Option value='1'>YES</Option>
                    </Select>
                  </div>

                  <div className='mb-3 text-center'>
                    <button className='btn btn-dark ' onClick={handleUpdate}>Update Product</button>
                  </div>

                  <div className='mb-3 text-center'>
                    <button className='btn btn-danger ' onClick={handleDelete}>Delete Product</button>
                  </div>

                </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}
