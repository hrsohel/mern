import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Stars from './Stars';
import {userContext} from '../App'

const ShowRating = () => {
    const [oneStar, setOneStar] = useState([])
    const [twoStar, setTwoStar] = useState([])
    const [threeStar, setThreeStar] = useState([])
    const [fourStar, setFourStar] = useState([])
    const [fiveStar, setFiveStar] = useState([])
    const [allStar, setAllStar] = useState([])
    const {state, dispatch} = useContext(userContext)
    const [food, setFood] = useState([])
    const params = useParams()
    const getSingleFood = async () => {
        const {data} = await axios.get(`/get-single-food/${params.id}`)
        setFood(data)
    }
    const getAllStars = async () => {
        const {data} = await axios.get(`/get-all-stars/${params.id}`)
        setOneStar(data.oneStar)
        setTwoStar(data.twoStar)
        setThreeStar(data.threeStar)
        setFourStar(data.fourStar)
        setFiveStar(data.fiveStar)
        setAllStar(data.message)
    }
    useEffect(() => {
        getSingleFood()
        getAllStars()
    }, [allStar])
    return (
        <>
           <div className="container">
                <div className="row my-2">
                    <div className="col-md-6">
                        <img src={`/uploads/foods/${food.img}`} alt="" className="img-fluid rounded img-thumbnail" />    
                    </div>
                    <div className="col-md-6">
                        <h3>{food.foodName}</h3>
                        <h5>{food.desc}</h5>
                        <p>{food.price}৳</p>
                    </div>    
                </div>
                <Stars foodId={params.id} user={state._id}/>
                <div className="row my-4">
                    <div className="col-4 ml-auto">
                        <div className="single-Rate">
                            <i class="fas fa-star"></i>
                            <span>1</span>    
                        </div>    
                        <div className="single-Rate">
                            <i class="fas fa-star"></i>
                            <span>2</span>    
                        </div>    
                        <div className="single-Rate">
                            <i class="fas fa-star"></i>
                            <span>3</span>    
                        </div>    
                        <div className="single-Rate">
                            <i class="fas fa-star"></i>
                            <span>4</span>    
                        </div>    
                        <div className="single-Rate">
                            <i class="fas fa-star"></i>
                            <span>5</span>    
                        </div>    
                    </div>
                    <div className="col-8">
                        <div className="progress my-2">
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: `${oneStar.length*100/allStar.length}%`}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="progress my-2">
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: `${twoStar.length*100/allStar.length}%`}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="progress my-2">
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: `${threeStar.length*100/allStar.length}%`}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="progress my-2">
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: `${fourStar.length*100/allStar.length}%`}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="progress my-2">
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: `${fiveStar.length*100/allStar.length}%`}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>    
                </div>   
            </div> 
        </>
    );
};

export default ShowRating;