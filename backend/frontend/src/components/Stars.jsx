import React, { useContext, useEffect, useState } from 'react';
import $ from "jquery"
import axios from 'axios';
import GetStars from './GetStars';
import {userContext} from '../App'

const Stars = ({foodId, user}) => {
    const {state, dispatch} = useContext(userContext)
    const [see, setSee] = useState(false)
    const [index, setIndex] = useState(0)
    const [allStars, setAllStars] = useState([])
    const [msg, setMsg] = useState("")
        $(".star").click(function() {
            let ratedIndex = $(this).data("index")
            $(".star").css("color", "#999")
            for(var i = 0; i < ratedIndex; i++) {
                $(".star").eq(i).css("color", "orange")
            }
        })
        const postRate = async (foodId, user) => {
            const {data} = await axios.post(`/post-rating`, {foodId, user, index}, {
                "Content-Type": "application/json"
            })
            setSee(false)
            if(data.status === 400) {
                setMsg(data.message)
            }
        }
        const getTotalStars = async () => {
            const {data} = await axios.get(`/get-all-stars/${foodId}`)
            setAllStars(data.message)
        }
        const totalRate = allStars.filter(val => {
            return val.foodId === foodId
        }).reduce((total, num) => {
            return (total + num.userRating)
        }, 0)
        useEffect(() => {
            getTotalStars()
        }, [see])
    return (
        <div className="container-fluid my-2">
            {
                totalRate > 0 ? <GetStars totalRate={totalRate} length={allStars.length}/> : ""
            }
            <div className="rating-container row d-flex align-items-center my-2">
                <div className="col-md-4">
                    <p className="text-danger">{msg}</p>
                    <p style={{color: "#666", fontSize: "1.2rem"}}>{
                        allStars.map(val => {
                            if(val.foodId === foodId && val.user === state._id) {
                                return `you have rated ${val.userRating} for this product`
                            }
                        })
                    }</p>
                    <p onClick={() => setSee(!see)} className="btn btn-secondary rating-btn my-1">
                        rate this product
                    </p>
                </div>
                {
                    see ? <div onClick={() => setSee(true)} className="col-md-8 rating border">
                        <i onClick={() => setIndex(1)} data-index={1} className="fas fa-star star"></i>
                        <i onClick={() => setIndex(2)} data-index={2} className="fas fa-star star"></i>
                        <i onClick={() => setIndex(3)} data-index={3} className="fas fa-star star"></i>
                        <i onClick={() => setIndex(4)} data-index={4} className="fas fa-star star"></i>
                        <i onClick={() => setIndex(5)} data-index={5} className="fas fa-star star"></i>
                        <button onClick={() => postRate(foodId, user)} className="btn btn-primary m-1">Post</button>
                    </div> : ""
                }
            </div>
        </div>
    );
};

export default Stars;