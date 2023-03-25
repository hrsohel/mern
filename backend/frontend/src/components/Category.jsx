import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../App';

const Category = () => {
    const [category, setCategory] = useState([])
    const [loading, setLodaing] = useState(false)
    const getCategory = async () => {
        const {data} = await axios.get("/category")
        setCategory(data)
        setLodaing(true)
    }
    useEffect(() => {
        getCategory()
    }, [])
    return (
        <>
        {
            loading ? <div className="container">
            <h1 className="text-center">our food menu</h1>
            <div className="row my-2">
                {
                    category.map(cat => {
                        return (
                        <div className="col-md-3 my-2">
                            <div className="card">
                                <img src={`/uploads/products/${cat.img}`} alt="" className="card-img img-fluid" />
                                <div className="card-body">
                                    <h3 className="card-title">{cat.catName}</h3>
                                    <p className="card-text">{cat.desc}</p>
                                    <p className="card-text">quantity: {cat.qty}</p>
                                    <Link to={`/food-menu/${cat.catName}`} className="btn btn-secondary">see food items</Link>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div> : 
                <div style={{height: "100vh"}, {fontSize: "10rem"}} class="text-center">
                    <div style={{height: "100%"}} class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </>
    );
};

export default Category;