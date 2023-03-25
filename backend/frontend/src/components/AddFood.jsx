import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {userContext} from '../App'

const AddFood = () => {
    const history = useHistory()
    const {state, dispatch} = useContext(userContext)
    const [foodName, setFoodName] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("")
    const [radio, setRadio] = useState("")
    const [price, setPrice] = useState(0)
    const [img, setImg] = useState("")
    const [cat, setCat] = useState([])
    const [msg, setMsg] = useState("")
    if(!state.isAdmin) {history.push("/")}
    const getCategory = async () => {
        const {data} = await axios.get("/category")
        setCat(data)
    }
    const addFood = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("foodName", foodName)
        formData.append("desc", desc)
        formData.append("category", category)
        formData.append("radio", radio)
        formData.append("price", price)
        formData.append("img", img)
        const {data} = await axios.post("/add-food", formData, {headers: {"Content-Type": "multipart/form-data"}})
        setMsg(data.message)
        setFoodName("")
        setRadio("")
        setPrice(0)
        setDesc("")
        setImg("")
        setCategory("")
    }
    useEffect(() => {
        getCategory()
    }, [])
    return (
        <div className="container">
            <div className="row my-2 d-flex align-items-center">
                <div className="col-md-6">
                    <h1 className="text-center">add new food item</h1>
                    <h4 className="text-success text-center">{msg}</h4>
                </div>
                <div className="col-md-6">
                    <form action="">
                        <div className="form-group my-2">
                            <label htmlFor="" className="form-label">food name</label>
                            <input onChange={(e) => setFoodName(e.target.value)} type="text" defaultValue={foodName} className="form-control" required/>
                        </div>
                        <div className="form-group my-3">
                            <label className="form-label">category</label>
                            <select onChange={(e) => setCategory(e.target.value)} multiple="" defaultValue={category} class="form-select" id="exampleSelect2" required>
                                {
                                    cat.map((x) => {
                                        return (
                                            <option key={x._id}>{x.catName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                            <input onClick={(e) => setRadio(e.target.value)} type="radio" defaultValue={radio} class="form-check-input" name="optionsRadios" id="optionsRadios1" value="yes"/>
                            yes
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                            <input onClick={(e) => setRadio(e.target.value)} type="radio" defaultValue={radio} class="form-check-input" name="optionsRadios" id="optionsRadios1" value="no"/>
                            no
                            </label>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="" className="form-label">description</label>
                            <textarea onChange={(e) => setDesc(e.target.value)} placeholder="description" defaultValue={desc} className="form-control"></textarea>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="" className="form-label">price</label>
                            <input type="number" onChange={(e) => setPrice(e.target.value)} placeholder="price" defaultValue={price} className="form-control"></input>
                        </div>
                        <div class="form-group my-2">
                            <label for="formFile" class="form-label mt-4">choose image</label>
                            <input onChange={(e) => setImg(e.target.files[0])} class="form-control" defaultValue={img} type="file" id="formFile" required/>
                        </div>
                        <div className="form-group my-2">
                            <button onClick={addFood} className="btn btn-secondary">add food</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;