import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast';

export default function Layout(props) {
  return (
    <>
    <div>
        {/* Adding SEO meta tags in application */}
        <Helmet>
            <meta charSet='utf-8'/>
            <meta name="description" content={props.description} />
            <meta name="keywords" content={props.keyword}/>
            <meta name="author" content={props.author} />
            <title>{props.title}</title>
        </Helmet>

        <Header/>
        <main style={{minHeight:'80vh'}}>
          <Toaster position='bottom-right' toastOptions={{duration:4000}}/>
            {props.children}
        </main>
        <Footer/>
    </div>
    </>
  )
}

Layout.defaultProps = {
  title: 'EzBuyHub - Ghar Bna Bazar',
  decription: "Online Shopping Platform with Payment Gateway",
  keywords: 'Mobiles, Watches, Shopping, E-commerce, Laptops, Tables, Almirah, Contact, buy, price, dress, pent, shirts, gifts, perfumes',
  author:"Sujal Mahajan",
};