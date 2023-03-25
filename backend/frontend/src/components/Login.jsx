import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {userContext} from "../App"

const Login = () => {
    const {state, dispatch} = useContext(userContext)
    const {_state, _dispatch} = useContext(userContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const getData = async (e) => {
        try {
            e.preventDefault()
            const res = await fetch("/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            const data = await res.json()
            if(data.status === 400) {
                setMsg(data.message)
            } else if(data.status === 401) {
                setMsg(data.message)
            } else {
                localStorage.setItem("user", JSON.stringify(data.data))
                localStorage.setItem("isLogin", JSON.stringify(true))
                dispatch({type: "USER", payload: JSON.parse(localStorage.getItem("user"))})
                _dispatch({type: "LOGIN", payload: localStorage.getItem("isLogin")})
                history.push("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
    // useEffect(() => {
    //     if(isLogin) {
    //         history.push("/")
    //     }
    // })
    return (
        <div className="container">
            <div className="row d-flex align-items-center">
                <div className="col-md-6">
                    <img src="/images/login.jpg" alt="" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <form action="">
                        <div className="form-group my-2">
                            <label className="form-label">your email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" required/>
                        </div>
                        <div className="form-group my-2">
                            <label className="form-label">password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <button onClick={getData} className="btn btn-secondary">login</button>
                        </div>
                        <h4 className="text-center py-3 text-danger">{msg}</h4>
                    </form>
                    <p>don't you have an account? <Link to="/register">register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;