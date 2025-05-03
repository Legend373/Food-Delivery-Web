import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    return (

        <div className='login-popup'>

            <form className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2 >{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />

                </div>
                <div className='popUp-input'>
                    {currState === "Login" ? <></> : <input type='text' placeholder='Your name' required />}

                    <input type='email' placeholder='Your email' required />
                    <input type='password' placeholder='Your password' required />
                </div>
                <button>{currState === 'Sign up' ? "Create Account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>By continuing,i agree to the terms of use and privacy policy</p>



                </div>
                {currState === "Login" ? <p>Craete new account <span onClick={() => setCurrState("Sign up")}>Click here</span></p> : <p>Alreay have an acount <span onClick={() => setCurrState("Login")}>Login here</span></p>}

            </form>


        </div>
    )
}

export default LoginPopup
