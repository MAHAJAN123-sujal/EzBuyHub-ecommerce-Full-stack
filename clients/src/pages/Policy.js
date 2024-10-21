import React from 'react'
import Layout from '../components/Layout'

export default function Policy() {
  return (
    <>
    <Layout title={"Privacy Policy - EzBuyHub"}>
      <div className="row">
        <div className="col-md-8 ml-2 p-3">
          <h2 className='text-center text-danger mt-4 text-decoration-underline'>Terms and Conditions</h2>
          <p>1. Use of the EzBuyHub platform signifies agreement to these terms and conditions.</p>
          <p>2. Users must be at least 16 years old to utilize EzBuyHub services.</p>
          <p>3. All account information must be accurate, current, and promptly updated as needed.</p>
          <p>4. Users are responsible for maintaining the confidentiality of their account credentials.</p>
          <p>5. EzBuyHub acts as a marketplace connecting buyers and sellers; it does not guarantee the quality or legality of products/services.</p>
          <p>6. Product descriptions, images, and prices are provided by sellers; EzBuyHub does not guarantee their accuracy or completeness.</p>
          <p>7. By placing an order, users agree to pay the indicated amount, including taxes and shipping fees.</p>
          <p>8. Payment processing is handled by third-party processors; EzBuyHub is not responsible for any errors or delays.</p>
          <p>9. All sales are final; returns and refunds are subject to the policies of the seller.</p>
          <p>10. All content and materials on EzBuyHub are the property of EzBuyHub or its licensors and are protected by copyright and other laws.</p>
          <p>11. Users may not use, reproduce, distribute, or display any content from EzBuyHub without prior written consent.</p>
          <p>12. EzBuyHub shall not be liable for any damages arising from the use of its platform or products/services purchased through it.</p>
          <p>13. Users agree to indemnify and hold EzBuyHub harmless from any claims arising from their use of the platform.</p>
          <p>14. EzBuyHub reserves the right to modify or terminate the platform at any time.</p>
          <p>15. These terms and conditions are governed by the laws of Government of India.</p>
          <p>16. If any provision is found invalid, the remaining provisions shall remain in full force and effect.</p>
          <p>17. These terms and conditions constitute the entire agreement between the user and EzBuyHub.</p>
        </div>

        <div className="col-md-4 ">
        <div className="card bg-light mt-4 mb-4" style={{width: '22rem'}}>
            <div className="text-center">
                <img src='/images/img1_policy.jpg' className="card-img-top prod-img-5 m-2" />
            </div>
          </div>
        <div className="card bg-light mb-4 " style={{width: '22rem'}}>
            <div className="text-center">
                <img src='/images/img2_policy.jpg' className="card-img-top prod-img-5 m-2" />
            </div>
          </div>
        <div className="card bg-light mb-2 " style={{width: '22rem'}}>
        <div className="card-body ">
              <h3 className="card-title text-success text-center">Guidelines</h3>
              <p className="card-text text-decoration-underline">Your security is our priority. We use top-notch encryption for safe transactions.</p>
              <p className="card-text text-decoration-underline"> Know our terms clearly, including easy refund and return policies.</p>
              <p className="card-text text-decoration-underline">We partner with trusted sellers committed to top-quality products.</p>
              <p className="card-text text-decoration-underline">Our dedicated team is here to help you whenever you need assistance.</p>
              <p className="card-text text-decoration-underline"> Pay securely with our reliable payment options.</p>
              <p className="card-text text-decoration-underline">Get tailored recommendations based on your preferences for a better shopping journey.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  )
}
