const express = require('express')
const protect = require('../authenticate/auth')
const { addCategory, getProduct, updateCategory, getSingleCategory, deleteCategory, addFood, getFoods, getFood, getSingleFood, updateFood, deleteFood, postRating, getAllStars, orderedItems, getOrdered } = require('./productController')
const route = express.Router()
const userController = require('./userController')

route.post("/add-user", userController.addUser)
route.post("/login", userController.loginUser)
route.get("/cart", protect, (req, res) => {
    res.json({
        user: req.user, 
        token: req.token
    })
})

route.get("/get-user", userController.getUser)
route.get("/logout", userController.logout)

route.post("/add-category", addCategory)
route.get("/category", getProduct)
route.get("/update-category/:id", getSingleCategory)
route.post("/update-category/:id", updateCategory)
route.post("/delete-category", deleteCategory)
route.post("/add-food", addFood)
route.get("/get-food", getFoods)
route.get("/get-food/:catName", getFood)
route.get("/get-single-food/:id", getSingleFood)
route.post("/update-food/:id", updateFood)
route.post("/delete-food/:id", deleteFood)
route.post("/add-cart", userController.addCart)
route.get("/get-cart/:id", userController.getCart)
route.post("/delete-cart/:id", userController.deleteCart)
route.post("/add-order", userController.addOrder)
route.get("/get-order", userController.getOrder)
route.get("/get-single-order/:id", userController.singleOrder)
// route.post("/update-order/:id", userController.updateOrder)
route.post("/delete-order", userController.deleteOrder)
route.post("/update-profile/:id", userController.updateProfile)
route.post("/post-rating", postRating)
route.get("/get-all-stars/:id", getAllStars)
route.get("/get-ordered-data", getOrdered)

module.exports = route