const User = require('../models/userModel')
const expressAsync = require('express-async-handler')
const bcrypt = require('bcryptjs')
const generateToken = require('../generateToken/userToken')
const cart = require("../models/cart")
const food = require('../models/foodModel')
const order = require('../models/order')
const ordered = require("../models/ordered")
const { query } = require('express')
const fs = require("fs")
const { setOrdered } = require('./productController')

exports.addUser = expressAsync (async (req, res) => {
   const {name, email, password, cpassword} = req.body
   if(!name || !email || !password || !cpassword) {
       return res.status(400).json({message: "All Feild Required", status: 400})
   }
   if(password !== cpassword) {
       return res.status(401).json({message: "password not matched", status: 401})
   }
   const userExist = await User.findOne({email})
   if(userExist) {
       return res.status(402).json({message: "user already exist!", status: 402})
   }
   const user = new User({name, email, password})
   await user.save()
   if(user) {
       return res.status(201).json({message: "User Crerated", status: 201})
   } else {
       return res.status(403).json({message: "User Not Addes", status: 403})
   }
})

exports.loginUser = expressAsync (async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({message: "All Feild Required", status: 400})
    }
    const existUser = await User.findOne({email})
    if(existUser && await existUser.matchPassword(password)) {
        const token = await generateToken(existUser._id)
        res.cookie("userToken", token, {
            expires: new Date(Date.now() + 1296000000),
            httpOnly: true
        })
        res.json({message: "Thank You, You Are Verified", data: existUser})
    } else {
        res.status(401).json({message: "Invalid User Or Password", status: 401})
    }
})

exports.getUser = expressAsync( async (req, res) => {
    let page = parseInt(req.query.page)
    if(page < 1) {page = 1}
    const totalUser = await User.find().count()
    const pageSize = parseInt(req.query.limit) || 4
    const pages = Math.ceil(totalUser / pageSize)
    if(page > pages) {page = pages}
    const skip = (page - 1) * pageSize
    const user = await User.find().skip(skip).limit(pageSize)
    const users = await User.find()
    res.json({user: user, pages: pages, users: users})
})

exports.logout = (req, res) => {
    res.status(200).clearCookie("userToken", {path: "/"}).json({status: 200})
}

exports.addCart = expressAsync(async(req, res) => {
    const {user, email, isAdmin, foodId, img} = req.body
    const foods = await food.findById(foodId)
    const category = foods.category
    const foodName = foods.foodName
    const price = foods.price
    const carts = new cart({user, email, category, foodId, foodName, price, isAdmin, img})
    await carts.save()
    if(carts) {res.json({message: "Added To Cart", status: 200})}
    else{res.status(401).json({message: "Can't Add To Cart", status: 401})}
})

exports.getCart = expressAsync(async(req, res) => {
    const cartInfo = await cart.find({user: req.params.id})
    if(cartInfo) {return res.json(cartInfo)}
    else {return res.status(401).json({message: "You Have No Cart", status: 401})}
})

exports.deleteCart = expressAsync(async(req, res) => {
    const deletedCart = await cart.findByIdAndDelete(req.params.id)
    if(deletedCart) {return res.status(200).json(200)}
    else {return res.status(401).json(401)}
})

exports.addOrder = expressAsync(async(req, res) => {
    const {user, foodId, message, qty} = req.body
    const foods = await cart.findById(foodId)
    const foodName = foods.foodName
    const deleteId = foods.foodId
    const category = foods.category 
    const price = foods.price
    const users = await User.findById(user)
    const userName = users.name
    const userId = users._id
    const email = users.email
    const orders = new order({userName, userId, email, foodName, category, message, qty, price})
    await orders.save()
    await cart.deleteOne({foodId: deleteId})
    if(orders) {return res.json({message: "We Got Your Order, Thank You", status: 200})}
    else {return res.status(401).json({message: "Can't Add Order", status: 401})}
})

exports.getOrder = expressAsync(async(req, res) => {
    let orders = await order.find()
    const totalOrders = await order.find().count()
    let page = parseInt(req.query.page) || 1
    if(page < 1) {page = 1}
    const pageSize = parseInt(req.query.limit) || 4
    const pages = Math.ceil(totalOrders / pageSize)
    if(page > pages) {page = pages}
    const skip = (page - 1) * pageSize
    const lastIndex = page * pageSize
    const _orders = await order.find().skip(skip).limit(pageSize).sort({_id: -1})
    const result = _orders
    const pendingOrder = await order.find({status: "pending"}).count()
    if(orders) {return res.json({
        orders: orders, lastIndex: lastIndex, page: page, pageSize: pageSize,
        skip: skip, pages: pages, result: result, resultLength: result.length, pendingOrder: pendingOrder
    })}
    else {res.status(401).json({message: "No Order Found", status: 401})}
})

// exports.updateOrder = expressAsync(async(req, res) => {
//     const {status} = req.body
//     if(status === "deliverd") {
//         const foods = await food.find()
//         const users = await User.find()
//         const {foodName, category} = foods
//         console.log(foods.foodName)
//         const {userId, userName, userEmail} = users
//         console.log(userName)
//         const deliveredItems = new ordered({
//             foodName, category, userId, userName, userEmail
//         })
//         await deliveredItems.save()
//         if(deliveredItems) {
//             console.log("document saved")
//             await order.findByIdAndDelete(req.params.id)
//             return res.json({response: deliveredItems, status: 200})
//         }
//     } else {
//         const updatedOrder = await order.findByIdAndUpdate(req.params.id, {status: status})
//         if(updatedOrder) {res.json(updatedOrder)}
//         else {return res.status(401).json({message: "not updated", status: 401})}
//     }
// })

exports.singleOrder = expressAsync(async(req, res) => {
    const data = await order.findById(req.params.id)
    if(data) {res.json(data)}
    else {return res.status(401).json({message: "not data found", status: 401})}
})

exports.deleteOrder = expressAsync(async(req, res) => {
    const {id, status} = req.body
    if(status !== "deliverd") {
        return res.json({message: "you can not delete this record", status: 400})
    } else {
        const deletedOrder = await order.findByIdAndDelete(id)
        if(deletedOrder) {res.json({message: "1 Item deleted", status: 200})}
        else {res.json({message: "can not delete data", status: 401})}
    }
})

exports.updateProfile = expressAsync(async(req, res) => {
    const {name, email, password, oldImg} = req.body
    if(!req.files) {var img = oldImg} else {
        const image = req.files.img
        const ext = image.mimetype.split("/")[1]
        var img = `user.${Date.now()}.${ext}`
        image.mv(`.././frontend/public/uploads/users/${img}`)
        if(oldImg) {
            fs.unlink(`.././frontend/public/uploads/users/${oldImg}`, err => {
                if(err) {return res.json({message: "image not deleted", status: 403})}
            })
        }
    }
    if(password === "") {return res.json({message: "password required", status: 401})}
    const updatedProfile = await User.findByIdAndUpdate(req.params.id, {
        name, email, img
    }, {new: true})
    if(updatedProfile) {return res.json({message: "your profile updated", user: updatedProfile, status: 200})}
    else {return res.json({message: "your profile can't updated", status: 402})}
})