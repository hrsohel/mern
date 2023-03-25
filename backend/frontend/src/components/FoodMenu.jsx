import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {userContext} from '../App'

const FoodMenu = () => {
    const [loading, setLoading] = useState(true)
    const {state, dispatch, _state} = useContext(userContext)
    const [foods, setFoods] = useState([])
    const params = useParams()
    const getFood = async () => {
        const {data} = await axios.get(`/get-food/${params.catName}`)
        setFoods(data)
        setLoading(false)
    }
    const addCart = async (foodId, img) => {
        const user = state._id
        const email = state.email
        const isAdmin = state.isAdmin
        const {data} = await axios.post("/add-cart", {user, email, isAdmin, foodId, img},{
            headers: {"Content-Type": "application/json"}
        })
    }
    useEffect(() => {
        getFood()
    }, [])
    return (
        <>
        {
            !loading ? <div className="container">
            <h1 className="text-center">food menu: {params.catName}</h1>
            <div className="row my-3">
            {
                foods.map(x => {
                    return (
                        <div key={x._id} className="col-md-4 my-2">
                            <div className="card">
                                <img src={`/uploads/foods/${x.img}`} className="card-img img-fluid"></img>
                                <div className="card-body">
                                    <h3 className="card-title">{x.foodName}</h3>
                                    <h5 className="card-title">{x.desc}</h5>
                                    <p className="card-text">price: {x.price}৳</p>
                                    <Link className="btn btn-default" to={`/show-rating/${x._id}`}>see details</Link>
                                    <Link onClick={() => addCart(x._id, x.img)} className="btn btn-secondary" to={`/cart`}>add to cart</Link>
                                </div>
                            </div>      
                        </div>  
                    )
                })
            }
            </div>          
        </div> : <div style={{height: "100vh"}, {fontSize: "10rem"}} class="text-center">
                    <div style={{height: "100%"}} class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
        }
        
        </>
    );
};

export default FoodMenu;