import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../App';

const CategoryPanel = () => {
    const {state, dispatch} = useContext(userContext)
    const [product, setProduct] = useState([])
    const [seachProduct, setSeachProduct] = useState("")
    const history = useHistory()
    if(!state.isAdmin) {history.push("/")}
    const getData = async () => {
        const {data} = await axios.get("/category")
        setProduct(data)
        console.log(product)
    }
    const deleteCategory = async (e) => {
        e.preventDefault()
        const id = product._id
        console.log(id)
        const formData = new FormData()
        formData.append("id", id)
        const {data} = axios.post("/delete-category", formData, {
            headers: {"Content-Type": "application/json"}
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="container">
            <h1 className="text-center">category</h1>
            <form className="d-flex">
                <input onChange={(e) => setSeachProduct(e.target.value)} className="form-control me-sm-2 w-25" type="text" placeholder="Search category"/>
            </form>
            <Link to="/add-category" className="btn btn-secondary my-2">add category</Link>
            <h5 className="my-2">Total Row: {product.length}</h5>
            <div className="table-responsive-lg">
            <table class="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">category ID</th>
                        <th scope="col">category name</th>
                        <th scope="col">active</th>
                        <th scope="col">quantity</th>
                        <th scope="col">actions</th>
                    </tr>
                </thead>
                {
                    product.filter(val => {
                        if(seachProduct === "") {
                            return val
                        } else if(val._id.includes(seachProduct) ||
                        val.catName.toLowerCase().includes(seachProduct.toLowerCase())) {
                            return val
                        }
                    }).map((cat, key) => {
                        return (
                            <tbody key={cat._id}>
                                <tr class="table-active">
                                    <th scope="row">{cat._id}</th>
                                    <td>{cat.catName}</td>
                                    <td>{cat.radio}</td>
                                    <td>{cat.qty}</td>
                                    <td>
                                        <Link to={`update-category/${cat._id}`} className="btn btn-primary mx-1">update</Link>
                                        <button onClick={deleteCategory} className="btn btn-danger mx-1">delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
            </div>
        </div>
    );
};

export default CategoryPanel;