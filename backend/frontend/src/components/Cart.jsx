import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {userContext} from '../App'

const Cart = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const {_state, _dispatch, state, dispatch} = useContext(userContext)
    const [cart, setCart] = useState([])
    console.log(_state)
    if(!_state) {history.push("/")}
    const getCart = async () => {
        const {data} = await axios.get(`/get-cart/${state._id}`)
        setCart(data)
        setLoading(true)
    }
    const deleteCart = async (id) => {
        const {data} = await axios.post(`/delete-cart/${id}`)
        if(data === 200) {getCart()}
    }
    useEffect(() => {
        getCart()
    }, [])
    return (
        <>
        {
            loading ? <div className="container">
            <h1 className="text-center">your cart</h1>
            <div className="row my-3 d-flex align-items-center">
                <div className="col-md-6">
                    {
                        cart.map(x => {
                            return (
                            <div key={x._id} className="row">
                                <div className="col-md-4">
                                    <img src={`/uploads/foods/${x.img}`} alt="" className="img-fluid" />
                                </div>
                                <div className="col-md-4">
                                    <h3>{x.category}</h3>
                                    <h5>{x.foodName}</h5>
                                    <p>price:{x.price}৳</p>
                                    <i onClick={() => deleteCart(x._id)} title="Delete This Item From Your Cart" className="fas fa-trash"></i>
                                </div>
                                <div className="col-md-4">
                                    <Link className="btn btn-secondary" to={`/confirm-order/${x._id}`}>confirm this food</Link>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                <div className="col-md-6 border text-center py-3">
                    <h3>total Cart: {
                        cart.length === 0 ? "You Have No Cart" : cart.length
                    }</h3>
                    <p>total price: {cart.reduce((total, val) => {
                        return total + val.price
                    }, 0)} TAKA</p>
                </div>
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

export default Cart;