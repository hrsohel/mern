import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { userContext } from '../App';

const FoodItems = () => {
    const {state, dispatch} = useContext(userContext)
    const [foods, setFoods] = useState([])
    const [searchFood, setSearchFood] = useState("")
    const [msg, setMsg] = useState("")
    const history = useHistory()
    if(!state.isAdmin) {
        history.push("/")
    }
    const getDate = async () => {
        const {data} = await axios.get("/get-food")
        setFoods(data)
    }
    const deleteFood = async (id, img) => {
        const {data} = await axios.post(`/delete-food/${id}`, {img},{
            headers: {"Content-Type": "application/json"}
        })
        setMsg(data.message)
        getDate()
    }
    useEffect(() => {
        getDate()
    }, [])
    return (
        <div className="container">
            <h1 className="text-center">food items</h1>
            <form className="d-flex">
                <input onChange={(e) => setSearchFood(e.target.value)} className="form-control me-sm-2 w-25" type="search" placeholder="Search food"/>
            </form>
            <Link to="/add-food" className="btn btn-secondary my-2">add food</Link>
            <h3 className="text-success ml-auto my-1">{msg}</h3>
            <table class="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">food ID</th>
                        <th scope="col">food name</th>
                        <th scope="col">category</th>
                        <th scope="col">active</th>
                        <th scope="col">price</th>
                        <th scope="col">actions</th>
                    </tr>
                </thead>
                {
                    foods.filter(val => {
                        if(searchFood === "") {
                            return val
                        } else if(val._id.toLowerCase().includes(searchFood.toLowerCase()) ||
                        val.foodName.toLowerCase().includes(searchFood.toLowerCase()) ||
                        val.category.toLowerCase().includes(searchFood.toLowerCase())){
                            return val
                        }
                    }).map(x => {
                        return (
                        <tbody key = {x._id}>
                            <tr class="table-active">
                                <th scope="row">{x._id}</th>
                                <td>{x.foodName}</td>
                                <td>{x.category}</td>
                                <td>{x.radio}</td>
                                <td>{x.price}</td>
                                <td>
                                    <Link to={`update-food/${x._id}`}  className="btn btn-primary mx-1">update</Link>
                                    <button onClick={() => deleteFood(x._id, x.img)} className="btn btn-danger mx-1">delete</button>
                                </td>
                            </tr>
                        </tbody>
                        )
                    })
                }
            </table>
        </div>
    );
};

export default FoodItems;