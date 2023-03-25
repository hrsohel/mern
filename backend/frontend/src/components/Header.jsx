import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../cooking-5201968.png'
import { userContext } from '../App';
import $ from 'jquery'

const Header = () => {
  $(".nav-item").click(function() {
    $(".nav-item").addClass("nav-active").siblings().removeClass("nav-active")
  })
  var {state, dispatch, _state, active, activeDispatch} = useContext(userContext)
  const setActive = (e) => {
    if(e.target.checked) {
      localStorage.setItem("active", true)
      activeDispatch({type: "ACTIVE", payload: {isOpen: localStorage.getItem("active"), data: "We Are Open Now", show: "OPEN"}})
    } else {
      localStorage.setItem("active", false)
      activeDispatch({type: "NOT_ACTIVE", payload: {isOpen: localStorage.getItem("active"), data: "We Are Closed Now", show: "CLOSED"}})
    }
  }
  return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container">
    <Link className="navbar-brand" to="/">
        <img src={logo} className="img-fluid" alt="" width="50" height="50"/>
        <h6 className="text-white">{active.isOpen ? active.data : active.data }</h6>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav" style={{margin: "0 auto"}}>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">category</Link>
        </li>
         {
           _state ? <li className="nav-item">
           <Link className="nav-link" to={`/cart`}>Your Cart</Link>
         </li> : ""
         } 
        {
          state.isAdmin ? <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Admin panel</a>
          <div class="dropdown-menu">
            <Link class="dropdown-item" to="/admin-panel">Admin</Link>
            <Link class="dropdown-item" to="/category-panel">Categories</Link>
            <Link class="dropdown-item" to="/food-panel">food items</Link>
            <Link class="dropdown-item" to="/order-panel">order</Link>
            <Link class="dropdown-item" to="/user-panel">users</Link>
            <Link class="dropdown-item" to="/ordered">ordered</Link>
          </div>
        </li> : ""
        } 
        {
          _state ? <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{state.name}</a>
          <div class="dropdown-menu">
            <Link class="dropdown-item" to="/profile">profile</Link>
            <Link class="dropdown-item" to="/logout">logout</Link>
          </div>
        </li> : <li className="nav-item">
          <Link className="nav-link" to="/login">login</Link>
        </li>
        }
        {
          _state ? "" : <li className="nav-item">
          <Link to="/register" className="nav-link">register</Link>
      </li>
        }
        {
          state.isAdmin ? <li className="nav-item m-1">
          <div className="form-check form-switch">
          <input onClick={setActive} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
            <label className="form-check-label text-white" for="flexSwitchCheckDefault">{active.isOpen ? active.show : active.show}</label>
          </div>
          </li> : ""
        }
      </ul>
      <form className="d-flex">
        <input className="form-control me-sm-2" type="text" placeholder="Search food"/>
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        </>
    );
};

export default Header;