import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then(res => res.json())
      .then(data => setItems(data))
  }, [])

  function handleAddItem(newItem) {
    setItems([...items, newItem])

  }

  function handleDeleteItem(deletedItem) {
    const newArray = items.filter((item) => item.id !== deletedItem.id)
    setItems(newArray)

  }
  function handleUpdateItem(updatedItem) {
    const newArray = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem
      }
      return item
    })
    setItems(newArray)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onHandleDelete={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
