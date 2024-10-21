import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd';

export default function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [name,setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected,setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState('');

    // for form submitting
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/v1/category/create-category',{name});
            if(data?.success){
                toast.success(` Category ${name} Created `);
                getAllCategory();
                setName('');
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error('Submission Error')
        }
    }

    // for update purpose
    const handleUpdate = async(e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name:updatedName});
            if(data?.success){
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName('');
                setVisible(false);
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error('Unable to update Form')
        }
    }

    // for update purpose
    const handleDelete = async(pid) =>{
        try{
            const {data} = await axios.delete(`/api/v1/category/delete/${pid}`);
            if(data?.success){
                toast.success(`category is deleted`);
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error('Unable to delete category')
        }
    }

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

    return (
        <Layout title={'Dashborad - Create Category'}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Manage Categories</h1>
                    <div className='p-3'>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                    </div>
                    <div className='w-75'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                         
                                {categories?.map((c) => (
                                    <>
                                    <tr>
                                        <td key={c._id}>{c.name}</td>
                                        <td>
                                            <button className='btn btn-dark ms-3' onClick={()=>{setVisible(true) ; setUpdatedName(c.name);
                                            setSelected(c);
                                            }}>Edit</button>
                                            <button className='btn btn-danger ms-3' onClick={()=>{handleDelete(c._id)}}>Delete</button>
                                            </td>
                                    </tr>
                                    </>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible}> <CategoryForm value={updatedName}  setValue={setUpdatedName} handleSubmit={handleUpdate}/></Modal>
                </div>
            </div>
        </div>
        </Layout>
    )
}
