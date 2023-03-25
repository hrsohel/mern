import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { userContext } from '../App';

const OrderFood = () => {
    const [loading, setLoading] = useState(true)
    const {_state, _dispatch} = useContext(userContext)
    const {state, dispatch} = useContext(userContext)
    const [message, setMessage] = useState("")
    const [msg, setMsg] = useState("")
    const [qty, setQty] = useState("")
    const history = useHistory()
    const params = useParams()
    const foodId = params.id 
    const user = state._id
    const addOrder = async (e) => {
        e.preventDefault()
        setLoading(false)
        const {data} = await axios.post("/add-order", {user, foodId, message, qty})
        setMsg(data.message)
        setLoading(true)
    }
    if(!_state) {history.push("/")}
    return (
        <div className="container">
            <h1 className="text-center">confirm your order</h1>
            <div className="row my-3">
                <div className="col-md-6">
                    <img src="/images/order.jpg" alt="" className="img-fluid" />
                    <h4 className="text-center text-success">{msg}</h4>
                </div>
                <div className="col-md-6">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="" className="form-label my-2">your name</label>
                            <input type="text" className="form-control" value={state.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label my-2">your email</label>
                            <input type="email" className="form-control" value={state.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label my-2">your address</label>
                            <textarea onChange={(e) => setMessage(e.target.value)} className="form-control" placeholder="your address"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label my-2">quantity</label>
                            <input onChange={(e) => setQty(e.target.value)} type="number" className="form-control" placeholder="quantity" />
                        </div>
                        {
                            loading ? <div className="form-group my-2">
                            <button onClick={addOrder} className="btn btn-primary">confirm</button>
                        </div> : <button class="btn btn-primary" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderFood;