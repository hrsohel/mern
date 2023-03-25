import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom'
import { userContext } from '../App';

const User = () => {
    const history = useHistory()
    const {state, dispatch} = useContext(userContext)
    const [user, setUser] = useState([])
    const [searchUser, setSearchUser] = useState("")
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(1)
    if(!state.isAdmin) {history.push("/")}
    const getUser = async () => {
        const {data} = await axios.get(`/get-user?page=${page}`)
        setUser(data.user)
        setPages(data.pages)
    }
    useEffect(() => {
        getUser()
    }, [page])
    const middlePagination = [...Array(pages)].map((_, p) => {
        return (
            <li key={p+1} class={p + 1 === page ? `page-item active`: `page-item` }>
                <Link class="page-link" onClick={() => setPage(p + 1)} to={`/user-panel`}>{p + 1}</Link>
            </li>
        )
    })
    return (
        <div className="container">
           <h1 className="text-center">users</h1>
            <form className="d-flex">
                <input onChange={(e) => setSearchUser(e.target.value)} className="form-control me-sm-2 w-25" type="search" placeholder="Search user"/>
            </form>
            <table class="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">user ID</th>
                        <th scope="col">user name</th>
                        <th scope="col">email</th>
                        <th scope="col">role</th>
                    </tr>
                </thead>
                {
                    user.filter(val => {
                        if(searchUser === "") {
                            return val
                        } else if(val._id.includes(searchUser) ||
                        val.name.toLowerCase().includes(searchUser.toLowerCase()) ||
                        val.email.toLowerCase().includes(searchUser.toLowerCase())) {
                            return val
                        }
                    }).map((user, key) => {
                        return(
                            <tbody key={user._id}>
                                <tr class="table-active">
                                    <th scope="row">{user._id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
                
            </table> 
            <div style={{margin: ".1rem auto"}}>
            <ul class="pagination">
            {
                page !== 1 ? <li class="page-item">
                                <Link class="page-link" to={`/user-panel`} onClick={() => setPage(page => page - 1)} disabled={page === 1}>&laquo;</Link>
                            </li> : ""
            }
            {middlePagination}
            {
                page !== pages ? <li class="page-item">
                                    <Link class="page-link" to={`/user-panel`} onClick={() => setPage(page => page + 1)} disabled={page === pages}>&raquo;</Link>
                                </li> : ""
            }
            </ul>
            </div>
        </div>
    );
};

export default User;