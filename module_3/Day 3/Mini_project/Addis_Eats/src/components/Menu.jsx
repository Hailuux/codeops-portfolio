import React, {useState} from 'react'
import Dish from './Dish'
import { func } from 'prop-types'
import CategoryBar from './CategoryBar'
import OrderForm from './OrderForm'

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
  const [total,setTotal] = useState(0);
  const [category,setCategory] = useState("All")

  const shown = 
          category === "All"? dishes:
          category === "Main dish"? mainCat:
          category === "Side dish"? sideCat: bever;

  function addToOrder(price){
    setTotal(total + price);  
  }

  return (
    <div>
        <h2>Our Dishes</h2>
        <h2>Total: {total} </h2>
        <CategoryBar onSelectCategory = {setCategory}/>
        <div className='dish_container'>
               {shown.map((dish) => (
                <Dish key= {dish.id} {...dish} onAdd = {addToOrder}/>
              ))}
        </div>
        <OrderForm/>
    </div>
      
  )
}

export default Menu;