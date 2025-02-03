import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
             <img src="https://res.cloudinary.com/dk9buau62/image/upload/v1738498585/Abstract_Chef_Cooking_Restaurant_Free_Logo__1_-removebg-preview_ocmxdb.png" alt="" className="logo" />
             <p>Hi, I’m Nagasai, and I’d love to welcome you to my restaurant, where every dish is crafted to delight your taste buds and create unforgettable dining moments. Join us for a flavorful experience that’s sure to leave you craving more!</p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon} alt="" /> 
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
               </div>
            </div>
            <div className='footer-content-center'>
                <h2> COMPANY </h2>
                <ul>
                    <li> Home </li>
                    <li> About Us </li>
                    <li> Delivery</li>
                    <li> Privacy Policy </li>
                </ul>
            </div>
            <div className='footer-content-right'>
            <h2> GET IN TOUCH </h2>
            <ul>
                <li>+1-233-456-987</li>
                <li>sai@gmail.com</li>
            </ul>
            </div>
        </div>
       <hr />
       <p className='footer-copyright'> Copyright 2025 @ nagasai Janipireddy - All Right Reserved.</p>
    </div>
  )
}

export default Footer
