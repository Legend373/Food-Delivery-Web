import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Cart.css'

const Cart = () => {
    const { cartItem, food_list, removeCartItem, getTotalCartAmount } = useContext(StoreContext);
    return (
        <div className='cart'>
            <div className='cart-item'>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItem[item._id] > 0) {
                        return (
                            <div>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={item.image} alt='' />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItem[item._id]}</p>
                                    <p>${item.price * cartItem[item._id]}</p>
                                    <p onClick={() => removeCartItem(item._id)} className='cross'>x</p>

                                </div>
                                <hr />


                            </div>



                        )

                    }

                })}

            </div>
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div className='cart-total-details'>
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className='cart-total-details'>
                        <p>Delivery Fee</p>
                        <p>${2}</p>
                    </div>
                    <hr />
                    <div className='cart-total-details'>
                        <b>Total</b>
                        <b>${getTotalCartAmount() + 2}</b>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>


                </div>


                <div className='cart-promocode'>
                    <div>
                        <p>If you have a promocode,you can enter it here</p>
                        <div className='card-promocode-input'>
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Cart
