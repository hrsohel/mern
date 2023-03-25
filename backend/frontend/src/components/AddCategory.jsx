import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {userContext} from '../App'

const AddCategory = () => {
    const history = useHistory()
    const [radio, setRadio] = useState("")
    const [catName, setCatName] = useState("")
    const [qty, setQty] = useState(0)
    const [img, setImg] = useState("")
    const [desc, setDesc] = useState("")
    // const {state, dispatch} = useContext(userContext)
    // if(!state.isAdmin) { history.push("/") }
    const addCat = async (e) => {
        e.preventDefault()
        const config = {headers: {"Content-Type": "multipart/form-data"}}
        const formData = new FormData()
        formData.append("catName", catName)
        formData.append("radio", radio)
        formData.append("qty", qty)
        formData.append("imageName", img)
        formData.append("desc", desc)
        const {data} = await axios.post("/add-category", formData, config)
        console.log(data)
    }
    return (
        <div className="container">
            <div className="row my-2 d-flex align-items-center">
                <div className="col-md-6">
                    <h1>add your food category</h1>
                </div>
                <div className="col-md-6">
                    <form>
                        <div className="form-group my-2">
                            <label htmlFor="" className="form-label">category name</label>
                            <input onChange={(e) => setCatName(e.target.value)} type="text" name="catName" className="form-control" required/>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                            <input onClick={(e) => setRadio(e.target.value)} type="radio" name="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="yes" />
                            yes
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                            <input onClick={(e) => setRadio(e.target.value)} type="radio" name="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="no" />
                            no
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label my-2">your name</label>
                            <textarea onChange={(e) => setDesc(e.target.value)} className="form-control" placeholder="your address"></textarea>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="" className="form-label">quantity</label>
                            <input onChange={(e) => setQty(e.target.value)} type="number" name="qty" className="form-control" required/>
                        </div>
                        <div class="form-group my-2">
                            <label for="formFile" class="form-label mt-4">choose image</label>
                            <input onChange={(e) => setImg(e.target.files[0])} class="form-control" type="file" filename="imageName" required/>
                        </div>
                        <div className="form-group my-2">
                            <button onClick={addCat} className="btn btn-secondary">add category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;