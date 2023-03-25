import React from 'react';

const GetStars = ({totalRate, length}) => {
    const rating = (totalRate / length).toPrecision(2)
    return (
        <>
        {
            rating > 0 && rating < 1 ? <div className="stars">
            <i className="fas fa-star-half-alt" style={{color: "orange"}}></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span className="text-warning">{rating}/5</span>
        </div> : rating >= 1 && rating < 1.5 ?
        <div className="stars">
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star-half-alt" style={{color: "orange"}}></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span className="text-warning">{rating}/5</span>
        </div> : rating >=1.5 && rating < 2 ?
        <div className="stars">
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star-half-alt" style={{color: "orange"}}></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span className="text-warning">{rating}/5</span>
        </div> : rating >=2 && rating < 2.5 ?
        <div className="stars">
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star-half-alt" style={{color: "orange"}}></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span className="text-warning">{rating}/5</span>
        </div> : rating >= 2.5 && rating < 3 ?
        <div className="stars">
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star-half-alt" style={{color: "orange"}}></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span className="text-warning">{rating}/5</span>
        </div> : rating >= 3 && rating < 3.5 ?
        <div className="stars">
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star-half-alt" style={{color: "orange"}}></i>
            <i className="fas fa-star"></i>
            <span className="text-warning">{rating}/5</span>
        </div> : rating >= 3.5 && rating < 4 ?
        <div className="stars">
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star-half-alt" style={{color: "orange"}}></i>
            <i className="fas fa-star"></i>
            <span className="text-warning">{rating}/5</span>
        </div> : rating >= 4 && rating <= 4.5 ?
        <div className="stars">
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star-half-alt" style={{color: "orange"}}></i>
            <span className="text-warning">{rating}/5</span>
        </div> : rating > 4.5 && rating <= 5 ?
        <div className="stars">
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <i className="fas fa-star" style={{color: "orange"}}></i>
            <span className="text-warning">{rating}/5</span>
        </div> : ""
        }
        </>
    );
};

export default GetStars;