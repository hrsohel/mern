import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userContext } from '../App';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
    const [show, setShow] = useState(false)
    const history = useHistory()
    const {state, dispatch, _state} = useContext(userContext)
    if(!_state) {history.push("/")}
    return (
        <>
        <div className="container my-2">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img src={state.img ? `/uploads/users/${state.img}` : "/images/login.jpg"} width="300" height="300" className="img-fluid img-thumbnail" alt="" />
                </div>
                <div className="col-md-6">
                    <div className="row my-1">
                        <div className="col-sm-6"><h5>id</h5></div>
                        <div className="col-sm-6">{state._id}</div>
                    </div>
                    <div className="row my-1">
                        <div className="col-sm-6"><h5>name</h5></div>
                        <div className="col-sm-6">{state.name}</div>
                    </div>
                    <div className="row my-1">
                        <div className="col-sm-6"><h5>email</h5></div>
                        <div className="col-sm-6">{state.email}</div>
                    </div>
                    <div className="row my-1">
                        <div className="col-sm-6"><h5>role</h5></div>
                        <div className="col-sm-6">{state.isAdmin ? "admin" : "user"}</div>
                    </div>
                </div>
            </div>
            <button onClick={() => setShow(true)} className="btn btn-secondary d-block mx-auto">update profile</button>
        </div>
        {
            show ? <UpdateProfile show={show} setShow={setShow}/> : ""
        }
        </>
    );
};

export default Profile;