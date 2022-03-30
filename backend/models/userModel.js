const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    img: {type: String},
    password: {type: String},
    isAdmin: {type: Boolean, default: false}
})

Schema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

Schema.methods.matchPassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model("users", Schema)

module.exports = User