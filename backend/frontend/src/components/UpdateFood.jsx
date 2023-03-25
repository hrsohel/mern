import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { userContext } from '../App';

const UpdateFood = () => {
    const [singleFood, setSingleFood] = useState([])
    const [category, setCategory] = useState([])
    const history = useHistory()
    const params = useParams()
    const {state, dispatch} = useContext(userContext)
    var select
    const [_foodName, setFoodName] = useState("")
    const [_category, _setCategory] = useState("")
    const [_radio, setRadio] = useState("")
    const [_price, setPrice] = useState("")
    const [img, setImg] = useState("")
    const [msg, setMsg] = useState("")
    if(!state.isAdmin) {history.push("/")}
    const getFood = async () => {
        const {data} = await axios.get(`/get-single-food/${params.id}`)
        setSingleFood(data)
    }
    const getCategory = async () => {
        const {data} = await axios.get("/category")
        setCategory(data)
    }
    const updateFood = async (e) => {
        e.preventDefault()
        const foodName = _foodName !== "" ? _foodName : singleFood.foodName
        const category = _category !== "" ? _category : singleFood.category
        const radio = _radio !== "" ? _radio : singleFood.radio
        const price = _price !== "" ? _price : singleFood.price
        const formData = new FormData()
        formData.append("foodName", foodName)
        formData.append("category", category)
        formData.append("radio", radio)
        formData.append("price", price)
        formData.append("img", img)
        formData.append("oldImg", singleFood.img)
        const config = {headers: {"Content-Type": "multipart/form-data"}}
        const {data} = await axios.post(`/update-food/${singleFood._id}`, formData, config)
        setMsg(data.message)
    }
    useEffect(() => {
        getFood()
        getCategory()
    }, [])
    return (
        <div className="container">
            <div className="row my-2 d-flex align-items-center">
                <div className="col-md-6">
                    <h1 className="text-center">update your food item</h1>
                    <h4 className="text-center text-success">{msg}</h4>
                </div>
                <div className="col-md-6">
                    <form action="">
                        <div className="form-group my-2">
                            <label htmlFor="" className="form-label">food name</label>
                            <input onChange={(e) => setFoodName(e.target.value)} type="text" defaultValue={singleFood.foodName} className="form-control" required/>
                        </div>
                        <div className="form-group my-3">
                            <label className="form-label">category: {singleFood.category}</label>
                            <select onChange={(e) => _setCategory(e.target.value)} value={_category !=="" ? _category : singleFood.category} multiple="" class="form-select" id="exampleSelect2" required>
                                {
                                    category.map(x => {
                                        return(
                                            <option key={x._id}>{x.catName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                            {
                                singleFood.radio === "yes" ? <input onClick={(e) => setRadio(e.target.value)} type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue={singleFood.radio} 
                                checked/> : <input onClick={(e) => setRadio(e.target.value)} type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue="yes" 
                                />
                            }
                            yes
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                            {
                                singleFood.radio === "no" ? <input onClick={(e) => setRadio(e.target.value)} type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue={singleFood.radio} 
                                checked/> : <input onClick={(e) => setRadio(e.target.value)} type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue="no" 
                                />
                            }
                            no
                            </label>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="" className="form-label">price</label>
                            <input onChange={(e) => setPrice(e.target.value)} type="number" defaultValue={singleFood.price} className="form-control" required/>
                        </div>
                        <img src={`/uploads/foods/${singleFood.img}`} alt="" className="img-fluid" />
                        <div class="form-group my-2">
                            <label for="formFile" class="form-label mt-4">choose image</label>
                            <input onChange={(e) => setImg(e.target.files[0])} class="form-control" type="file" accept="jpeg, jpg, png, jiff" id="formFile" required/>
                        </div>
                        <div className="form-group my-2">
                            <button onClick={updateFood} className="btn btn-secondary">update food</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateFood;