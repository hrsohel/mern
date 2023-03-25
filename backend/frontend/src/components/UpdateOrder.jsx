import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { userContext } from '../App';

const UpdateOrder = () => {
    const params = useParams()
    const history = useHistory()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("")
    const {state, dispatch} = useContext(userContext)
    if(!state.isAdmin) {history.push("/")}
    const getOrder = async () => {
        const {data} = await axios.get(`/get-single-order/${params.id}`)
        setData(data)
        setLoading(true)
    }
    const updateOrder = async (id) => {
        setLoading(false)
        const {data} = await axios.post(`/update-order/${id}`, {status})
        setLoading(true)
        history.push("/order-panel")
    }
    useEffect(() => {
        getOrder()
    }, [])
    return (
        <div className="container">
            <div className="row d-flex align-items-center">
                <div className="col-md-6">
                    <img src="/images/signup.jpg" alt="" className="img-fluid" />
                </div>
                {
                    loading ? <div className="col-md-6">
                    {
                    <form action="">
                        <div className="form-group my-3">
                            <label className="form-label">food name</label>
                            <input type="text" value={data.foodName} className="form-control" required/>
                        </div>
                        <div className="form-group my-3">
                            <label className="form-label">to</label>
                            <input type="email" value={data.email} className="form-control" required/>
                        </div>
                        <div className="form-group my-3">
                            <label className="form-label">address</label>
                            <textarea value={data.message} className="form-control"></textarea>
                        </div>
                        <div className="form-group my-3">
                            <label className="form-label">quantity</label>
                            <input type="number" value={data.qty} className="form-control" required/>
                        </div>
                        <div className="form-group my-3">
                            <label className="form-label">status</label>
                            <select onChange={(e) => setStatus(e.target.value)} defaultValue={data.status} multiple="" class="form-select" id="exampleSelect2" required>
                                <option>pending</option>
                                <option>on deliver</option>
                                <option>deliverd</option>
                            </select>
                        </div>
                        <div className="form-group my-3">
                            <button onClick={() => updateOrder(data._id)} className="btn btn-secondary">update order</button>
                        </div>
                    </form>
                    }
                </div> : <div style={{height: "100vh"}, {fontSize: "10rem"}} class="col-md-6 text-center">
                            <div style={{height: "100%"}} class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default UpdateOrder;