import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { CartContext } from '../App';
import { useReducer } from 'react';

function Header() {

    const {cart} = useContext(CartContext);



  return (
    <div>
        <h1><strong><em>ADDIS EATS</em></strong></h1>
        <nav>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
        <h3>Cart Items: {cart.length}</h3>
    </div>
  )
}

export default Header