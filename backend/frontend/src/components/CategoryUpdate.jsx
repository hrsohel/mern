import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { userContext } from '../App';

const CategoryUpdate = () => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [_catName, setCatName] = useState("")
    const [_radio, setRadio] = useState("")
    const [_qty, setQty] = useState("")
    const [img, setImg] = useState("")
    const [msg, setMsg] = useState([])
    const {state, dispatch} = useContext(userContext)
    const params = useParams()
    const id = params.id
    const history = useHistory()
    if(!state.isAdmin) {history.push("/")}
    const getData = async () => {
        const {data} = await axios.get(`/update-category/${id}`)
        setProduct(data)
    }
    const updateData = async (e) => {
        e.preventDefault()
        setLoading(false)
        const catName = _catName !=="" ? _catName : product.catName
        const radio = _radio !=="" ? _radio : product.radio
        const qty = _qty !=="" ? _qty : product.qty
        const config = {headers: {"Content-Type": "multipart/form-data"}}
        const formData = new FormData()
        formData.append("catName", catName)
        formData.append("radio", radio)
        formData.append("qty", qty)
        formData.append("img", img)
        formData.append("oldImg", product.img)
        const {data} = await axios.post(`/update-category/${id}`, formData, config)
        setMsg(data.message)
        setLoading(true)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
        <div className="container">
            <div className="row my-2 d-flex align-items-center">
                <div className="col-md-6">
                    <h1 className="text-center">update your category</h1>
                    <h4 className="text-success text-center">{msg}</h4>
                </div>
                <div className="col-md-6">
                    <form action="">
                        <div className="form-group my-2">
                            <label htmlFor="" className="form-label">category name</label>
                            <input onChange={(e) => setCatName(e.target.value)} type="text" defaultValue={product.catName} className="form-control" required/>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                            {
                                product.radio === "yes" ? <input onClick={(e) => setRadio(e.target.value)} type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue={product.radio} 
                                checked/> : <input onClick={(e) => setRadio(e.target.value)} type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue="yes" 
                                />
                            }
                            yes
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                            {
                                product.radio === "no" ? <input onClick={(e) => setRadio(e.target.value)} type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue={product.radio} 
                                checked/> : <input onClick={(e) => setRadio(e.target.value)} type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue="no" 
                                />
                            }
                            no
                            </label>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="" className="form-label">quantity</label>
                            <input onChange={(e) => setQty(e.target.value)} type="number" defaultValue={product.qty} className="form-control" required/>
                        </div>
                        <img src={`/uploads/products/${product.img}`} alt="" className="img-fluid rounded" />
                        <input type="hidden" name="" defaultValue={product.img} />
                        <div class="form-group my-2">
                            <label for="formFile" class="form-label mt-4">choose image</label>
                            <input onChange={(e) => setImg(e.target.files[0])} class="form-control" type="file" filename="img" required/>
                        </div>
                        {
                            loading ? <div className="form-group my-2">
                            <button onClick={updateData} className="btn btn-secondary">update category</button>
                                    </div> : <button class="btn btn-primary" type="button" disabled>
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Loading...
                                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default CategoryUpdate;