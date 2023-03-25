import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [message, setMessage] = useState("")
    const addUser = async (e) => {
        try {
            e.preventDefault()
            const config = {headers: {"Content-Type": "application/json"}}
            const res = await fetch("/add-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password, cpassword})
        })
        const data = await res.json()
            if(data.status === 401) {
                setMessage(data)
            } else if(data.status === 400) {
                setMessage(data)
            } else if (data.status === 402) {
                setMessage(data)
            } else if (data.status === 403) {
                setMessage(data)
            } else {
                setMessage(data)
                history.push("/login")
                setCpassword("")
                setEmail("")
                setPassword("")
                setName("")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container">
            <div className="row d-flex align-items-center">
                <div className="col-md-6">
                    <img src="/images/signup.jpg" alt="" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <form action="">
                        <div className="form-group my-3">
                            <label className="form-label">your name</label>
                            <input onChange={(e)=>setName(e.target.value)} type="text" className="form-control" required/>
                        </div>
                        <div className="form-group my-3">
                            <label className="form-label">email</label>
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" required/>
                        </div>
                        <div className="form-group my-3">
                            <label className="form-label">password</label>
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" required/>
                        </div>
                        <div className="form-group my-3">
                            <label className="form-label">re-enter password</label>
                            <input type="password" onChange={(e) => setCpassword(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="form-group my-3">
                            <button onClick={addUser} className="btn btn-secondary">register</button>
                        </div>
                        <h4 className="text-center text-danger py-3">
                            {message.message}
                        </h4>
                    </form>
                    <p>do you have an account? <Link to="/login">login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;