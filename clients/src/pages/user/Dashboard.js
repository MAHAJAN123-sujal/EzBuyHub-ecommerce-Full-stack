import React from 'react';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import { useAuth } from '../../context/auth';

export default function Dashboard() {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
           <div className='container-fluid m-3 p-3'>
            <div className='row'>
              <div className="col-md-3">
                <UserMenu/>
              </div>
              <div className="col-md-9">
                <div className="card w-75 p-4">
                  <h3 className='text-decoration-underline'>User Name: {auth?.user?.name}</h3>
                  <h3 className='text-decoration-underline'>User Email: {auth?.user?.email}</h3>
                  <h3 className='text-decoration-underline'>User Phone: {auth?.user?.phone}</h3>
                  <h3 className='text-decoration-underline'>User Address: {auth?.user?.address}</h3>
                </div>
              </div>
            </div>
           </div>
      </Layout>
    </>
  )
}
