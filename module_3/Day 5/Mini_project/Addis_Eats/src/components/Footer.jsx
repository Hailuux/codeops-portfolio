import React from 'react'
import Card from './Card'
import { useContext } from 'react';
import { CartContext } from '../App';
import Dish from './Dish';





function Footer() {

  const {cart} = useContext(CartContext);

  

  return (
    

    <div className='footer'>
       
          <h3>Your Cart</h3>
    {
      cart.map((item) => (
        <Dish key = {item.id} {...item} />
        //   <h4>{item.name}</h4>
        // </Card>
          
      ))}
    
       <Card>
            <p>Contact: ABC</p>
            <p>Phone number: 123 456 0789</p>
            <p>Address: XYZ Street</p>
            <p>&copy; All Rights Reserved</p>
        </Card>
    </div>
  )
}

export default Footer