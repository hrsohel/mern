const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    userName: {type: String},
    userId: {type: String},
    email: {type: String},
    foodName: {type: String},
    category: {type: String},
    message: {type: String, trim: true},
    qty: {type: Number},
    price: {type: Number},
    status: {type: String, default: "pending"},
    date: {type: Date, default: Date.now()}
})

const order = mongoose.model("order", Schema)

module.exports = order