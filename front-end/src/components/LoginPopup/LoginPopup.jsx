import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
//import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    const { url, setToken } = useContext(StoreContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
            // toast.success(response.data.message)


        }
        else {
            alert(response.data.message)
        }
    }



    return (

        <div className='login-popup'>

            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2 >{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />

                </div>
                <div className='popUp-input'>
                    {currState === "Login" ? <></> : <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your password' required />
                </div>
                <button type='submit'>{currState === 'Sign up' ? "Create Account" : "Login"}</button>
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
