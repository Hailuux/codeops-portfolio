import React from 'react'
import propTypes from "prop-types"
import { useState } from 'react';

function Dish({name,price, category, isSpicy, currency = "ETB", onAdd}) {
      // const [count,setCount]= useState(0);

      // function add(){
      //       setCount(count + 1);
      // }

  return (
        <div className='dish'>
                <h3>{name}</h3>
                <p>{price} {currency}</p>
                <p>{category} </p>
               {/* { isSpicy && <p>Spicy</p>} */}
               {isSpicy && <p>🌶️ Spicy</p>}
              {/* <p>{isSpicy? "Spicy" : "Not Spicy"}</p> */}
              <button onClick={() => onAdd(price)}>Add</button>
              {/* <p>Quantity: {count}</p> */}
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