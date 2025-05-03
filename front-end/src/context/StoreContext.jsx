import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({})

    const addCartItem = (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))

        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))

        }
    }
    const removeCartItem = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in food_list) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];

            }

        }
        return totalAmount;
    }
    const contextValue = {
        food_list, addCartItem, removeCartItem, cartItem, getTotalCartAmount
    }



    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;