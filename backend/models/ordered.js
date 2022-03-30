const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    foodName: {type: String},
    category: {type: String},
    userId: {type: String},
    userName: {type: String},
    userEmail: {type: String},
    status: {type: String, default: "ordered"}
})

const model = mongoose.model("ordered", Schema)

module.exports = model