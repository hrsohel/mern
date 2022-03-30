const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    user: {type: String},
    email: {type: String},
    category: {type: String},
    foodId: {type: String},
    foodName: {type: String},
    price: {type: Number},
    isAdmin: {type: Boolean},
    img: {type: String},
    date: {type: Date, default: Date.now()}
})

const cart = mongoose.model("cart", Schema)

module.exports = cart