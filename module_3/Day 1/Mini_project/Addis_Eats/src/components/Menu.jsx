import React from 'react'
import Dish from './Dish'

const dishes = [
    {name:"Shiro",price: 200},
    {name:"Shiro",price: 200},
    {name:"Shiro",price: 200},
    {name:"Shiro",price: 200},
    {name:"Shiro",price: 200},
    {name:"Shiro",price: 200},
    {name:"Shiro",price: 200},
    {name:"Shiro",price: 200},
    {name:"Shiro",price: 200},
    
]

function Menu() {
  return (
    <div>
        <h2>Our Dishes</h2>
        <div className='dish_container'>
          {dishes.map((dish, index) => (
            <Dish key= {index} name = {dish.name} price = {dish.price}/>
          ))}
            
        </div>
    </div>
  )
}

export default Menu