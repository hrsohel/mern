const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    foodId: {type: String},
    user: {type: String},
    userRating: {type: Number}
})

const rating = mongoose.model("rating", Schema)

module.exports = rating