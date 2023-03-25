import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <div className="home-content text-center">
                <h1 style={{color: "white"}}>HR Food Corner</h1>
                <h3 style={{color: "white"}}>take healthy food, live healthy life</h3>
                <Link style={{color: "black"}} className="btn btn-light" to="/categories">see our food menu</Link>
            </div>
        </div>
    );
};

export default Home;