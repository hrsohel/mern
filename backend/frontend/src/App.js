import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import "./style.css"
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Category from "./components/Category";
import FoodMenu from "./components/FoodMenu";
import Cart from "./components/Cart";
import OrderFood from "./components/OrderFood";
import AdminPanel from "./components/AdminPanel";
import CategoryPanel from "./components/CategoryPanel";
import FoodItems from "./components/FoodItems";
import Order from "./components/Order";
import User from "./components/User";
import Login from "./components/Login";
import Register from "./components/Register";
import AddCategory from "./components/AddCategory";
import AddFood from "./components/AddFood";
import CategoryUpdate from "./components/CategoryUpdate";
import UpdateFood from "./components/UpdateFood";
import UpdateOrder from "./components/UpdateOrder";
import { createContext, Profiler, useReducer, useState } from "react";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import {
    initialState, 
    reducer, 
    stateForLogin, 
    reducerForLogin,
    stateForActive,
    reducerForActive
} from './reducer/useReducer'
import $ from 'jquery'
import ShowRating from "./components/ShowRating";
import Ordered from "./components/Ordered";

export const userContext = createContext()
function App() {
  const [_state, _dispatch] = useReducer(reducerForLogin, stateForLogin)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [active, activeDispatch] = useReducer(reducerForActive, stateForActive)
  const store = {
    _state, _dispatch, state, dispatch, active, activeDispatch
  }
  const Routing = () => {
    return (
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/categories"><Category/></Route>
        <Route exact path="/food-menu/:catName"><FoodMenu/></Route>
        <Route exact path="/cart"><Cart/></Route>
        <Route exact path="/confirm-order/:id"><OrderFood/></Route>
        <Route exact path="/admin-panel"><AdminPanel/></Route>
        <Route exact path="/category-panel"><CategoryPanel/></Route>
        <Route exact path="/food-panel"><FoodItems/></Route>
        <Route exact path="/order-panel"><Order/></Route>
        <Route exact path="/user-panel"><User/></Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/register"><Register/></Route>
        <Route exact path="/add-category"><AddCategory/></Route>
        <Route exact path="/add-food"><AddFood/></Route>
        <Route exact path="/update-category/:id"><CategoryUpdate/></Route>
        <Route exact path="/update-food/:id"><UpdateFood/></Route>
        <Route exact path="/update-order/:id"><UpdateOrder/></Route>
        <Route exact path="/logout"><Logout/></Route>
        <Route exact path="/profile"><Profile/></Route>
        <Route exact path="/show-rating/:id"><ShowRating/></Route>
        <Route exact path="/ordered"><Ordered/></Route>
      </Switch>
    )
  }
  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={store}>
          <Header />
            <Routing/>
          <Footer/>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
