import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";
    const [food_list, setFoodList] = useState([]);

    // Load cart items from localStorage when the component mounts
    useEffect(() => {
        const savedCartItems = localStorage.getItem("cartItems");
        if (savedCartItems) {
            try {
                const parsedCartItems = JSON.parse(savedCartItems);
                setCartItems(parsedCartItems);
                console.log("Loaded cart items from localStorage:", parsedCartItems); // Debugging
            } catch (error) {
                console.error("Error parsing cart items from localStorage:", error);
            }
        }
    }, []);

    // Save cart items to localStorage whenever they change
    useEffect(() => {
        console.log("Saving cart items to localStorage:", cartItems); // Debugging
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            const serverCartItems = response.data.cartData || {};
            console.log("Loaded cart data from server:", serverCartItems); // Debugging

            // Merge server cart data with localStorage cart data
            const mergedCartItems = { ...cartItems, ...serverCartItems };
            setCartItems(mergedCartItems);
            console.log("Merged cart items:", mergedCartItems); // Debugging
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const addToCart = async (itemId) => {
        const newCartItems = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
        console.log("Updated cart items (Add):", newCartItems); // Debugging
        setCartItems(newCartItems);

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        const newCartItems = { ...cartItems };
        if (newCartItems[itemId] > 0) {
            newCartItems[itemId] -= 1;
            if (newCartItems[itemId] === 0) {
                delete newCartItems[itemId]; // Remove the item if the count reaches 0
            }
            console.log("Updated cart items (Remove):", newCartItems); // Debugging
            setCartItems(newCartItems);

            if (token) {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += parseFloat(itemInfo.price) * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data || []);
            console.log("Loaded food list:", response.data.data); // Debugging
        } catch (error) {
            console.error("Error loading food list:", error);
        }
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;