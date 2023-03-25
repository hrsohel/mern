import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../App';

const Order = () => {
    const _search = useLocation().search
    const queryPage = new URLSearchParams(_search).get("page") < 0 ? 1 : new URLSearchParams(_search).get("page") 
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState([])
    const [pending, setPending] = useState("")
    const [page, setPage] = useState(queryPage)
    const [pages, setPages] = useState(1)
    const [msg, setMsg] = useState("")
    const [firstIndex, setFirstIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(0)
    const [search, setSearch] = useState("")
    const history = useHistory()
    const {state, dispatch} = useContext(userContext)
    if(!state.isAdmin) {history.push("/")}
    const getOrder = async () => {
        const {data} = await axios.get(`/get-order?page=${page}`)
        setLoading(true)
        setOrder(data.orders)
        setPending(data.pendingOrder)
        setPages(data.pages)
        setFirstIndex(data.skip)
        setLastIndex(data.lastIndex)
    }
    const deleteOrder = async (id, status) => {
        const {data} = await axios.post(`/delete-order`, {id, status})
        setMsg(data.message)
        getOrder()
    }
    useEffect(() => {
        getOrder()
    }, [page])
    var middlePagination = [...Array(pages)].map((_, p) => {
        return (
            <li key={p+1} class={p + 1 === page ? `page-item active`: `page-item` }>
                <Link class="page-link" onClick={() => setPage(p + 1)} to={`/order-panel`}>{p + 1}</Link>
            </li>
        )
    })
    return (
        <div className="container">
            <h1 className="text-center">orders</h1>
            <form className="d-flex">
                <input onChange={(e) => setSearch(e.target.value)} className="form-control me-sm-2 w-25" type="text" placeholder="Search order"/>
            </form>
            <h4 className="my-1 text-danger">{msg}</h4>
            <p className="btn btn-secondary my-1 order-note-btn">
                {pending > 0 ? `you have ${pending} orders on pending` : ""}
                <div className="order-note">{pending}</div>    
            </p>
            {
                loading ? <div className="table-responsive-lg"> <table class="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">food ID</th>
                        <th scope="col">food name</th>
                        <th scope="col">to</th>
                        <th scope="col">address</th>
                        <th scope="col">quantity</th>
                        <th scope="col">order date <br />(MM/DD/YYYY)</th>
                        <th scope="col">status</th>
                        <th scope="col">actions</th>
                    </tr>
                </thead>
                {
                    order.filter(val => {
                        if(search === "") { return val}
                        else if(val._id.includes(search) ||
                        val.foodName.toLowerCase().includes(search.toLowerCase()) ||
                        val.email.toLowerCase().includes(search.toLowerCase()) ||
                        val.message.toLowerCase().includes(search.toLowerCase()) ||
                        val.status.toLowerCase().includes(search.toLowerCase())) {return val}
                    }).slice(firstIndex, lastIndex).map(x => {
                        return (<tbody key={x._id}>
                        <tr class="" style={x.status === "pending" ? {color: "red"} : {color: "green"}}>
                            <th scope="row">
                                {x._id}
                            </th>
                            <td>{x.foodName}</td>
                            <td>{x.email}</td>
                            <td>{x.message}</td>
                            <td>{x.qty}</td>
                            <td>{new Date(x.date).toLocaleString()}</td>
                            <td>{x.status}</td>
                            <td>
                                <Link to={`/update-order/${x._id}`} className="btn btn-primary m-1">update</Link>
                                <button onClick={() => deleteOrder(x._id, x.status)} className="btn btn-danger mx-1">delete</button>
                            </td>
                        </tr>
                        </tbody>)
                    })
                }
            </table>
            <div style={{margin: ".1rem auto"}}>
            <ul class="pagination">
                {
                    page !== 1 ? <li class="page-item">
                                    <Link class="page-link" to={`/order-panel`} onClick={() => setPage(page => page - 1)} disabled={page === 1}>&laquo;</Link>
                                </li> : ""
                }
                {middlePagination}
                {
                    page !== pages ? <li class="page-item">
                    <Link class="page-link" to={`/order-panel`} onClick={() => setPage(page => page + 1)} disabled={page === pages}>&raquo;</Link>
                    </li> : ""
                }
                
            </ul>
            </div>
            </div> : <div style={{height: "100vh"}, {fontSize: "10rem"}} class="text-center">
                            <div style={{height: "100%"}} class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
            } 
        </div>
    );
};

export default Order;