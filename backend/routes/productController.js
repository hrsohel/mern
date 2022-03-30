const expressAsync = require('express-async-handler')
const fs = require("fs")
const food = require('../models/foodModel')
const product = require('../models/productModel ')
const rating = require('../models/rating')
const User = require("../models/userModel")
const ordered = require("../models/ordered")

exports.addCategory = expressAsync(async(req, res) => {
    const {catName, radio, qty, desc} = req.body
    const image = req.files.imageName
    const ext = image.mimetype.split("/")[1].toLowerCase()
    const img = `products.${Date.now()}.${ext}`
    if(!catName || !radio || !qty || !img || !desc) {
        return res.status(401).json({message: "All Feild Requires!", status: 401})
    }
    image.mv(`.././frontend/public/uploads/products/${img}`)
    const products = new product({catName, desc, radio, qty, img})
    await products.save()
    if(products) {return res.json({message: "product added", status: 200})}
    else {return res.status(402).json({message: "product not added", status: 402})}
})

exports.getProduct = expressAsync(async(req, res) => {
    const products = await product.find()
    res.status(200).json(products)
})

exports.getSingleCategory = expressAsync(async(req, res) => {
    const products = await product.findById(req.params.id)
    res.json(products)
})

exports.updateCategory = expressAsync(async(req, res) => {
    const {catName, radio, qty, oldImg} = req.body
    if(!req.files) {
        var img = oldImg
    } else {
        const image = req.files.img
        const ext = image.mimetype.split("/")[1]
        var img = `products.${Date.now()}.${ext}`
        image.mv(`.././frontend/public/uploads/products/${img}`)
        fs.unlink(`.././frontend/public/uploads/products/${oldImg}`, err => {
            if(err) { return res.status(402).json({message: "File Deletion Failed", status: 402})}
        })
    }
    const updatedProduct = await product.findByIdAndUpdate(req.params.id, {
        catName, radio, qty, img
    })
    if(updatedProduct) {return res.json({message: "Category Updated", status: 200})}
    else {return res.status(401).json({message: "Updated Failed", status: 401})}
})

exports.deleteCategory = expressAsync(async(req, res) => {
    console.log(req.body)
    const deleteItem = await product.findByIdAndDelete(req.body.id)
    if(deleteItem) {return res.json({message: "1 Item Deleted", status: 200})}
    else {return res.status(401).json({message: "Can't Delete Item", status: 401})}
})

exports.addFood = expressAsync(async(req, res) => {
    const {foodName, desc, category, price, radio} = req.body
    const image = req.files.img
    const ext = image.mimetype.split("/")[1]
    const img = `food.${Date.now()}.${ext}`
    if(!foodName || !desc || !category ||!price || !radio || !image) {
        return res.status(400).json({message: "All Feild Required!", status: 400})
    }
    image.mv(`.././frontend/public/uploads/foods/${img}`)
    const foods = new food({foodName, category, desc, price, radio, img})
    await foods.save()
    if(foods) { res.json({message: "food item added"})}
    else{ res.status(401).json({message: "Can't Add Food Item", status: 401})}
})

exports.getFoods = expressAsync(async(req, res) => {
    const foods = await food.find()
    if(foods) {return res.json(foods)}
    else{return res.status(401).json({message: "No food items", status: 401})}
})

exports.getFood = expressAsync(async(req, res) => {
    const foods = await food.find({$and: [{category: req.params.catName}, {radio: "yes"}]})
    if(foods) {res.json(foods)}
    else{res.status(401).json({message: "Can't gett food items", status: 401})}
})

exports.getSingleFood = expressAsync(async(req, res) => {
    const foods = await food.findById(req.params.id)
    if(foods) {return res.json(foods)}
    else {res.status(401).json({message: "Can't get food", status: 401})}
})

exports.updateFood = expressAsync(async(req, res) => {
    const {foodName, category, radio, price, oldImg} = req.body
    if(!req.files) {var img = oldImg}
    else {
        const image = req.files.img
        const ext = image.mimetype.split("/")[1]
        var img = `foods.${Date.now()}.${ext}`
        image.mv(`.././frontend/public/uploads/foods/${img}`)
        fs.unlink(`.././frontend/public/uploads/foods/${oldImg}`, err => {
            if(err) {
                res.status(401).json({message: "image deletion failed", status: 401})
            }
        })
    }
    const updatedFood = await food.findByIdAndUpdate(req.params.id, {
        foodName, category, radio, price, img
    })
    if(updatedFood) {
        return res.json({message: "1 food item updated", status: 200})
    } else {
        return res.status(402).json({message: "Update failed", status: 402})
    }
})

exports.deleteFood = expressAsync(async(req, res) => {
    fs.unlink(`.././frontend/public/uploads/foods/${req.body.img}`, err => {
        if(err) {return res.status(401).json({message: "Can't Delete Image", status: 401})}
    })
    const deletedData = await food.findByIdAndDelete(req.params.id)
    if(deletedData) {return res.json({message: "1 Item Deleted", status: 200})}
    else {return res.status(401).json({message: "Can't Delete Item", status: 401})}
})

exports.postRating = expressAsync(async(req, res) => {
    const {foodId, user, index} = req.body
    if(!user) {
        return res.json({message: "you may not have an account or you are not logged in", status: 400})
    }
    const existRating = await rating.find({$and: [{foodId: foodId}, {user: user}]})
    if(existRating.length === 0) {
        const setRating = new rating({
            foodId: foodId, user: user, userRating: index
        })
        await setRating.save()
        if(setRating) {
            return res.json({message: setRating, yourRate: index, status: 200})
        }
    } else {
        const updateRating = await rating.findByIdAndUpdate(existRating[0]._id, {
            foodId: foodId, user: user, userRating: index
        }, {new: true})
        if(updateRating) {
            return res.json({message: "you rate has been updated", yourRate: index, status: 200})
        }
    }
})

exports.getAllStars = expressAsync(async(req, res) => {
    const allStars = await rating.find({foodId: req.params.id})
    const oneStar = await rating.find({$and: [{foodId: req.params.id}, {userRating: 1}]})
    const twoStar = await rating.find({$and: [{foodId: req.params.id}, {userRating: 2}]})
    const threeStar = await rating.find({$and: [{foodId: req.params.id}, {userRating: 3}]})
    const fourStar = await rating.find({$and: [{foodId: req.params.id}, {userRating: 4}]})
    const fiveStar = await rating.find({$and: [{foodId: req.params.id}, {userRating: 5}]})
    if(allStars) {
        res.json({
            message: allStars, oneStar: oneStar, twoStar: twoStar,
            threeStar: threeStar, fourStar: fourStar, fiveStar: fiveStar, status: 200
        })
    }
})

exports.getOrdered = expressAsync(async(req, res) => {
    const getDelivered = await ordered.find()
    if(getDelivered) {
        return res.json({response: getDelivered, status: 200})
    }
})