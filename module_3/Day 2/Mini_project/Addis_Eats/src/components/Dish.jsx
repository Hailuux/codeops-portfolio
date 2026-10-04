import React from 'react'
import propTypes from "prop-types"

function Dish({name,price, category, isSpicy, currency = "ETB"}) {
  return (
        <div className='dish'>
                <h3>{name}</h3>
                <p>{price} {currency}</p>
                <p>{category} </p>
               {/* { isSpicy && <p>Spicy</p>} */}
               {isSpicy && <p>🌶️ Spicy</p>}
              {/* <p>{isSpicy? "Spicy" : "Not Spicy"}</p> */}
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