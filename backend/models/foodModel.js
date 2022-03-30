const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    foodName: {type: String, trim: true},
    category: {type: String, trim: true},
    desc: {type: String, trim: true},
    price: {type: Number},
    radio: {type: String},
    img: {type: String},
    date: {type: Date, default: Date.now()}
})

const food = mongoose.model("foodItems", Schema)

module.exports = food