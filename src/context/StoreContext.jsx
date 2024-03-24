import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
  const [cartItem, setCartItem] = useState({})
  const addToCart = (itemId)=>{
    if(!cartItem[itemId]){
      setCartItem((prev) => ({...prev, [itemId]:1}))
    } else{
      setCartItem((prev) => ({...prev,[itemId]:prev[itemId]+1}))
    }
  }

  const removeFromCart = (itemId) => {
    if(cartItem[itemId]){
      setCartItem(prev => ({...prev, [itemId]:prev[itemId]-1}))
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItem){
      let itemInfo = food_list.find((food)=>(food._id === item));
      totalAmount += itemInfo.price*cartItem[item];
    }
    return totalAmount;
  }

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;