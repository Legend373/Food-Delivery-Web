import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({})
    const url = "http://localhost:4000"
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);

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
    const fetchFood = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFood_list(response.data.data)
    }
    const contextValue = {
        food_list, addCartItem, removeCartItem, cartItem, getTotalCartAmount, url, token, setToken
    }

    useEffect(() => {

        async function loadFood() {
            await fetchFood()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
            }
        }
        loadFood()

    }, [])



    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;