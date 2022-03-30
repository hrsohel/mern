const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    catName: {type: String},
    desc: {type: String},
    radio: {type: String},
    qty: {type: Number},
    img: {type: String},
    date: {type: Date, default: Date.now()}
})

const product = mongoose.model("products", Schema)

module.exports = product