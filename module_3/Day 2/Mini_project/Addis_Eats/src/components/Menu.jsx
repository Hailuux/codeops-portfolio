import React from 'react'
import Dish from './Dish'

const dishes = [
    {id: 1, name:"Shiro",price: 250, category: "Main dish", isSpicy: true},
    {id: 2, name:"Misir",price: 250, category: "Main dish", isSpicy: true},
    {id: 3, name:"Doro Wot",price: 700, category: "Main dish", isSpicy: true},
    {id: 4, name:"Injera",price: 50, category: "Side dish", isSpicy: false},
    {id: 5, name:"Tibs",price: 700, category: "Main dish", isSpicy: true},
    {id: 6, name:"Kitfo",price: 800, category: "Main dish", isSpicy: true},
    {id: 7, name:"Gomen",price: 200, category: "Side dish", isSpicy: false},
    {id: 8, name:"Atakilt",price: 250, category: "Side dish", isSpicy: false},
    {id: 9, name:"Ayib",price: 200, category: "Side dish", isSpicy: false},
    {id: 10, name:"Gored Gored",price: 600, category: "Main dish", isSpicy: true},
    {id: 11, name:"Ambasha",price: 50, category: "Side dish", isSpicy: false},
    {id: 13, name:"Kik Alicha",price: 250, category: "Main dish", isSpicy: false},
    {id: 14, name:"Beyaynetu",price: 250, category: "Main dish", isSpicy: true},
    {id: 15, name:"Fossolia",price: 200, category: "Side dish", isSpicy: false},
    {id: 16, name:"Dinich Wot",price: 250, category: "Main dish", isSpicy: true},
    {id: 17, name:"Dulet",price: 600, category: "Main dish", isSpicy: true},
    {id: 18, name:"Salad",price: 200, category: "Side dish", isSpicy: false},
    {id: 20, name:"Coca",price: 100, category: "Beverages", isSpicy: false},
    {id: 21, name:"Ambo",price: 100, category: "Beverages", isSpicy: false},
    {id: 22, name:"Mirinda",price: 100, category: "Beverages", isSpicy: false},
    {id: 23, name:"Pepsi",price: 100, category: "Beverages", isSpicy: false},
    {id: 24, name:"Water",price: 80, category: "Beverages", isSpicy: false},
   
    
]

let mainCat = dishes.filter((dish) => dish.category === "Main dish")
let sideCat = dishes.filter((dish) => dish.category === "Side dish")
let bever = dishes.filter((dish) => dish.category === "Beverages")


function Menu() {
  return (
    <div>
        <h2>Our Dishes</h2>
        <h3>Main Courses</h3>
        <div className='dish_container'>
          {
            mainCat.length === 0 ?(
              <p>No Main Dishes available at the moment</p>
            ):(
              mainCat.map((dish, index) => (
            <Dish key= {dish.id} 
            // name = {dish.name} 
            // price = {dish.price}
            // category = {dish.category}
            // isSpicy ={dish.isSpicy}/>
             {...dish}/>
          ))
            )
          }
          
            
        </div>
        <h3>Side Dishes</h3>
        <div className='dish_container'>
          {
            sideCat.length === 0 ?(
              <p>No Side Dishes available at the moment</p>
            ):(
              sideCat.map((dish, index) => (
            <Dish key= {dish.id} {...dish}/>
          ))
            )
          }
          
        </div>
        <h3>Beverages</h3>
        <div className='dish_container'>
          {
            bever.length === 0 ?(
              <p>No Beverages available at the moment</p>
            ):(
              bever.map((dish, index) => (
            <Dish key= {dish.id} {...dish}/>
          ))
            )
          }
          
        </div>
    </div>
  )
}

export default Menu