import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({})
    const url = "http://localhost:4000"
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);

    const addCartItem = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))

        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))

        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }
    const removeCartItem = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const fetchFood = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFood_list(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { "headers": { token } })
        setCartItem(response.data.cartData)
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItem) {
            if (cartItem[itemId] > 0) {
                const itemInfo = food_list.find(product => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[itemId];
                }
            }
        }
        return totalAmount;
    }

    useEffect(() => {

        async function loadFood() {
            await fetchFood()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadFood()

    }, [])



    const contextValue = {
        food_list, addCartItem, removeCartItem, cartItem, getTotalCartAmount, url, token, setToken
    }




    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;