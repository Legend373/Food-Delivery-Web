import React, { useContext, useState } from 'react'
import "./NavBar.css"
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
const NavBar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, SetToken } = useContext(StoreContext);
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem("token")
        SetToken("")
        navigate('/')


    }
    return (
        <div className='navbar'>
            <img src={assets.logo} alt='' className='logo' />
            <ul className='navbar-menu'>
                <Link to='/'> <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li></Link>
                <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}><a href='#explore-menu'>menu</a></li>
                <a href='#app-download'><li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li></a>
                <a href='#contact-us'><li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</li></a>

            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt="" />
                <div className='navbar-search-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> : <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt='' />

                    <ul className='nav-profile-dropdown'>
                        <li onClick={() => navigate('/myorders')} ><img src={assets.bag_icon} alt='' /> <p>Orders</p></li>
                        <hr />
                        <li onClick={logOut}><img src={assets.logout_icon} alt='' /><p>Log out</p></li>
                    </ul>

                </div>}

            </div>

        </div >
    )
}

export default NavBar
