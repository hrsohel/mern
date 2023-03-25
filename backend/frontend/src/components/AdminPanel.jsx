import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userContext } from '../App';

const AdminPanel = () => {
    const {state, dispatch} = useContext(userContext)
    const history = useHistory()
    if(!state.isAdmin) {history.push("/")}
    return (
        <div className="container" 
        style={{height: "80vh"}}>
            <div className="row my-3 d-flex align-items-center justify-content-around"
            style={{height: "100%"}}>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h3>category</h3>
                            <h5>5</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h3>food</h3>
                            <h5>5</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h3>order</h3>
                            <h5>5</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h3>users</h3>
                            <h5>5</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;