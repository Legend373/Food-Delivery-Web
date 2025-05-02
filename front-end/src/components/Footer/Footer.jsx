import React from 'react'
import './footer.css'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img className='logo' src={assets.logo} />
                    <p>lorem epsum is a typical place holder for text used for creating helpful text palce holders</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt='' />
                        <img src={assets.linkedin_icon} alt='' />

                        <img src={assets.twitter_icon} alt='' />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>Get in touch</h2>
                    <ul>
                        <li>+251########</li>
                        <li>conact@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copy right 2025 @ Bite Bloom -All right reserved</p>

        </div>
    )
}

export default Footer
