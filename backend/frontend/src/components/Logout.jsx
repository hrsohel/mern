import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userContext } from '../App';

const Logout = () => {
    const history = useHistory()
    const {state, dispatch, _state, _dispatch} = useContext(userContext)
    const logout = async () => {
        const {data} = await axios.get("/logout")
        if(data.status === 200) {
            localStorage.removeItem("user")
            dispatch({type: "NO-USER", payload: ""})
            _dispatch({type: "LOGOUT", payload: localStorage.setItem("isLogin", false)})
            history.push("/login")
        }
    }
    useEffect(() => {
        logout()
    }, [])
    return (
        <div>
            
        </div>
    );
};

export default Logout;