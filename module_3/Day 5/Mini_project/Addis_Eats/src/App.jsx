import { useReducer, useState } from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'
import { useContext } from 'react';
import { createContext } from 'react';





export const CartContext = createContext();

function cartReducer(state, action){
    switch(action.type){
      case "Add to Cart":
        return [...state, action.payload];
      case "Remove from Cart":
        return state.filter(item => item.id !== action.payload.id);
      default:
        return state;
    }
}



function App() {
 
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <>
      <CartContext.Provider value={{cart, dispatch}}> 
        <Header/>
        <Menu/>
        <Footer/>
      </CartContext.Provider>
       
    </>
  )
}

export default App
