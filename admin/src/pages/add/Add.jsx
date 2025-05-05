import React, { useState } from 'react'
import "./Add.css";
import axios from "axios";
import { assets, url } from '../../assets/assets';
import { toast } from 'react-toastify';
const Add = () => {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "salad",
    })
    const url = "http://localhost:4000";
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))

    }
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData)
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "salad",
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-image-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />

                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} name='name' type='text' placeholder='Type here' />

                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} rows='6' name='description' type='text' placeholder='Write content here' />

                </div>
                <div className='add-category-price'>
                    <div className="add-product-category flex-col">
                        <p>Product Category</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option name='salad'>Salad</option>
                            <option name='rolls'>Rolls</option>
                            <option name='desert'>Desert</option>
                            <option name='sandwich'>Sandwich</option>
                            <option name='cake'>Cake</option>
                            <option name='pureveg'>Pure Veg</option>
                            <option name='pasta'>Pasta</option>
                            <option name='noodles'>Noodles</option>
                        </select>
                    </div>
                    <div className="add-product-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} name='price' type='number' placeholder='$20' />

                    </div>

                </div>
                <button className='add-btn' type='submit'>ADD</button>

            </form>

        </div>
    )
}

export default Add
