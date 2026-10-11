import React, {useState, useEffect} from 'react'
import Dish from './Dish'
import { func } from 'prop-types'
import CategoryBar from './CategoryBar'
import OrderForm from './OrderForm'
// import { useContext } from 'react';
// import { CartContext } from '../App';



// let mainCat = dishes.filter((dish) => dish.category === "Main dish")
// let sideCat = dishes.filter((dish) => dish.category === "Side dish")
// let bever = dishes.filter((dish) => dish.category === "Beverages")


function Menu() {
  const [total,setTotal] = useState(0);
  const [category,setCategory] = useState("All")
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

        async function fetchData() {
            try {
                const response = await fetch("dishes.json");
                const data = await response.json();
                console.log(data);
                setDishes(data.item);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            }finally{
              setLoading(false);
            }
        }
        fetchData(); 
    }, []);

  // const shown = 
  //         category === "All"? dishes:
  //         category === "Main dish"? mainCat:
  //         category === "Side dish"? sideCat: bever;

  function addToOrder(price){
    setTotal(total + price);  
  }

  return (
    <div>
        <h2>Our Dishes</h2>
        <h2>Total: {total} </h2>
        <CategoryBar onSelectCategory = {setCategory}/>
        <div className='dish_container'>
                {loading && <p>Loading menu...</p> }
                {error && <p>Error loading menu: {error.message}</p> }


               {!loading && !error &&
               dishes.map((dish) => (
                <Dish key= {dish.id} {...dish} onAdd = {addToOrder}/>
              ))}
        </div>
        <OrderForm/>
    </div>
      
  )
}

export default Menu;