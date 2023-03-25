import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {userContext} from '../App'

const UpdateProfile = ({show, setShow}) => {
    const history = useHistory()
    const {state, dispatch} = useContext(userContext)
    const [_name, setName] = useState("")
    const [_email, setEmail] = useState("")
    const [img, setImg] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const update = async (e) => {
        e.preventDefault()
        const name = _name ? _name : state.name 
        const email = _email ? _email : state.email
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("img", img)
        formData.append("password", password)
        formData.append("oldImg", state.img)
        const {data} = await axios.post(`/update-profile/${state._id}`, formData)
        if(data.status !== 200) {
            setMsg(data.message)
        }
        else if(data.status === 200) {
            history.push("/profile")
            dispatch({type: "USER", payload: data.user})
        }
    }
    return (
        <div className="update-profile container-fluid d-flex align-items-center justify-content-around">
            <div className="picShow"><img src={state.img ? `/uploads/users/${state.img}` : "/images/login.jpg"} alt="" className="img-fluid" /></div>
            <form action="">
                <h5 className="text-danger">{msg}</h5>
                <span onClick={() => setShow(false)}><i className="fas fa-times"></i></span>
                <div className="form-group my-1">
                    <label htmlFor="">full name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" defaultValue={state.name} className="form-control" id="" />
                </div>
                <div className="form-group my-1">
                    <label htmlFor="">email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" defaultValue={state.email} className="form-control" id="" />
                </div>
                <div class="form-group my-1">
                    <label for="formFile" className="form-label mt-4">update your profile picture</label>
                    <input onChange={(e) => setImg(e.target.files[0])} className="form-control" type="file" id="formFile"/>
                </div>
                <div className="form-group my-1">
                    <label htmlFor="">confirm your password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="" />
                </div>
                <div className="form-group my-1">
                    <button onClick={update} className="btn btn-secondary my-1">update your profile</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;