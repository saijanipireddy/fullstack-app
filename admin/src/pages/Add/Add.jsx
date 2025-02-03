import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const Value = event.target.value;
    setData(data => ({...data,[name]:Value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("image", image)

    const response = await axios.post("http://localhost:4000/api/food/add", formData)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: ""
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else {
      console.log(error);
    }

  }

  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className='add-img-upload flex-col'>
          <p> Upload Image </p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className='add-product-name flex-col'>
          <p> Product Name </p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder="Type Here" />
        </div>
        <div className='add-product-description flex-col'>
          <p> product Description </p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write Content Here' required></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p> Product category </p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad"> Salad</option>
              <option Value="Rolls"> Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg"> Pure veg</option>
              <option value="Pasta"> Pasta</option>
              <option value="Noodles"> Noodles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p> Product Price </p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' />
          </div>
        </div>
        <button type="submit" className='add-button'> Submit </button>
      </form>   
    </div>
  )
}

export default Add
