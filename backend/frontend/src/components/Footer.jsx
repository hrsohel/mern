import React from 'react';

const Footer = () => {
    return (
        <div className="container-fluid bg-primary footer py-2">
            <div className="row">
                <div className="col-md-3 my-3">
                    <h3>find us</h3>
                    <a href="">facebook</a>
                    <a href="">instagram</a>
                    <a href="">twitter</a>
                </div>
                <div className="col-md-3 my-3">
                    <h3>our branches</h3>
                    <a href="">hathazari</a>
                    <a href="">muradpur</a>
                    <a href="">GCE</a>
                    <a href="">agrabad</a>
                </div>
                <div className="col-md-3 my-3">
                    <h3>quick links</h3>
                    <a href="">categories</a>
                    <a href="">cart</a>
                    <a href="">about</a>
                </div>
                <div className="col-md-3 my-3">
                    <h3>service time</h3>
                    <p>we are open everyday
                    </p>
                    <p>9:00AM - 11:00PM</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;