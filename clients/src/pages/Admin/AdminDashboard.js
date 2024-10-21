import React from 'react'
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import { useAuth } from '../../context/auth';

export default function AdminDashboard() {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
           <div className='container-fluid m-3 p-3'>
            <div className='row'>
              <div className="col-md-3">
                <AdminMenu/>
              </div>
              <div className="col-md-9">
                <div className="card w-75 p-4">
                  <h3 className='text-decoration-underline'>Admin Name: {auth?.user?.name}</h3>
                  <h3 className='text-decoration-underline'>Admin Email: {auth?.user?.email}</h3>
                  <h3 className='text-decoration-underline'>Admin Phone: {auth?.user?.phone}</h3>
                </div>
              </div>
            </div>
           </div>
      </Layout>
    </>
  )
}
