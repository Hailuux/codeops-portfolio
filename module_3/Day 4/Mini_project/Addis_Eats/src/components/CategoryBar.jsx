import React from 'react'

function CategoryBar({onSelectCategory}) {

    const categories = [
        "All",
        "Main dish",
        "Side dish",
        "Beverages"
    ]

  return (
    <div>
        {categories.map((cat) => (
            <button onClick={() => onSelectCategory(cat)} key = {cat}>{cat}</button>
        ))}
    </div>
  )
}

export default CategoryBar;