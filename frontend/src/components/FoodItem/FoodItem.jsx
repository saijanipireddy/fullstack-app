import React, { useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,description,image,price}) => {
    const {cartItems, addToCart, removeFromCart,url} = useContext(StoreContext)
    const itemCount = cartItems?.[id] || 0;
    return (
      <div className='food-item'>
          <div className='food-item-img-container'>
              <img className='food-item-image' src={image} alt={name} />
              {itemCount === 0 ? (
                  <img src={assets.add_icon_white} className="add" onClick={() => addToCart(id)} alt="Add to cart" />
              ) : (
                  <div className='food-item-counter'>
                      <img src={assets.remove_icon_red} alt="Remove from cart" onClick={() => removeFromCart(id)} />
                      <p>{itemCount}</p>
                      <img src={assets.add_icon_green} alt="Add to cart" onClick={() => addToCart(id)} />
                  </div>
              )}
          </div>
          <div className='food-item-info'>
              <div className='food-item-name-rating'>
                  <p>{name}</p>
                  <img src={assets.rating_starts} alt="Rating" />
              </div>
              <p className='food-item-desc'>{description}</p>
              <p className='food-item-price'>${price}</p>
          </div>
      </div>
  )
}

export default FoodItem
