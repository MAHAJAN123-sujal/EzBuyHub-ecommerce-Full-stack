import React from 'react';
import Layout from '../components/Layout';

export default function About() {
  return (
    <>
    <Layout title={"About us - EzBuyHub"}>
      <div className="row m-3">
        <div className="col-md-8">
          <div className="text-center">
          <h3 className=' text-center btn btn-outline-dark p-4 bg-primary mod-h3' >EzBuyHub - Ghar Bna Bazar</h3>
          </div>
          <div className="text-center text-danger">

          <h5>Fastest growing Delivery Application</h5>
          <h5>Most Trusted Shopping Application</h5>
          <h5>Record for Most Number of deliveries</h5>
          <h5>Record for fastest deliveries</h5>
          <h5>Customer first choice</h5>
          </div>

            <div className="row">
          <div className="card bg-light m-2" style={{width: '22rem'}}>
            <div className="text-center">
          <img src='/images/card1_about.jpg' className="card-img-top prod-img-5 m-2" />
            </div>
            <div className="card-body text-center">
              <h3 className="card-title text-success">Best Quality</h3>
              <p className="card-text">We are here to provide you best quality products</p>
            </div>
          </div>
          <div className="card bg-light m-2" style={{width: '22rem'}}>
            <div className="text-center">
          <img src='/images/card2_about.jpg' className="card-img-top prod-img-5 m-2" />
            </div>
            <div className="card-body text-center">
              <h3 className="card-title text-success"> Best Price</h3>
              <p className="card-text">We Assure you with best reasonable price for each item</p>
            </div>
          </div>
          </div>

          <div className="row ">
          <div className="card bg-light m-2 " style={{width: '22rem'}}>
            <div className="text-center">
          <img src='/images/card3_about.jpg' className="card-img-top prod-img-5 m-2" />
            </div>
            <div className="card-body text-center">
              <h3 className="card-title text-success">New Technology</h3>
              <p className="card-text">We are here to provide you with Latest Technology</p>
            </div>
          </div>
          <div className="card bg-light m-2" style={{width: '22rem'}}>
            <div className="text-center">
          <img src='/images/card4_about.jpg' className="card-img-top prod-img-5 m-2" />
            </div>
            <div className="card-body text-center">
              <h3 className="card-title text-success">24x7 Availablity</h3>
              <p className="card-text">We guarantee 24x7 availability to all our customers</p>
            </div>
          </div>
          </div>
        </div>
        <div className="col-md-4">
        <div className="card mb-2 bg-info mt-4" style={{width: '26rem'}}>
            <div className="text-center">
          <img src='/images/card5_about.jpg' className="card-img prod-img-6 m-3" />
            </div>
        </div>

        <div className="card mt-4" style={{width: '26rem'}}>
            <div className="card-body text-center">
              <h3 className="card-title text-success">Owner Details</h3>
              <h6 className="card-text text-decoration-underline">Mahajan&Groups</h6>
              <h6 className="card-text text-decoration-underline">mahajan@123gmail.com</h6>
              <h6 className="card-text text-decoration-underline">Best Enterpreneur of Year</h6>
              <h6 className="card-text text-decoration-underline">Partner with Nescafe, Myntra, GoDaddy</h6>
              <h6 className="card-text text-decoration-underline">Managed by CU students</h6>
              <h6 className="card-text text-decoration-underline">Chandigarh,India</h6>
            </div>
        </div>
        </div>
      </div>
    </Layout>
    </>
  )
}

