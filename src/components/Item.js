import React from "react";

function Item({ item, onUpdateItem, onHandleDelete }) {

  function handleAddToCartClick() {
    fetch(`//localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isInCart: !item.isInCart })
    })
      .then(res => res.json())
      .then(updatedItem => onUpdateItem(updatedItem))

  }

  function handleDelete() {
    fetch(`//localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => onHandleDelete(item))

  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
