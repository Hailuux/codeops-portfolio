import React from 'react'
import propTypes from "prop-types"
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../App';


function Dish({id,name,price, category, isSpicy, currency = "ETB", onAdd}) {
      
      const {cart, dispatch} = useContext(CartContext);


  return (
        <div className='dish'>
                <h3>{name}</h3>
                <p>{price} {currency}</p>
                <p>{category} </p>
               {/* { isSpicy && <p>Spicy</p>} */}
               {isSpicy && <p>🌶️ Spicy</p>}
              {/* <p>{isSpicy? "Spicy" : "Not Spicy"}</p> */}
              <button onClick={() => onAdd(price)}>Add</button>

            {
                  cart.some((item) => item.id === id) ? (
                        <button onClick={() => dispatch
                  ({
                        type: "Remove from Cart",
                        payload: {id}
                  })
              } >
                  Remove from Cart
              </button> ) : (
                        <button onClick={() => dispatch
                  ({
                        type: "Add to Cart",
                        payload: {id, name, price, category, isSpicy}
                  })
              } >
                  Add to Cart
              </button>
                        )
            }

              
        </div>
  )
} 

Dish.propTypes = {
      name: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
      isSpicy: propTypes.bool,
      category: propTypes.string.isRequired
}

export default Dish