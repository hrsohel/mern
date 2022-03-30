const express = require('express')
const app = express()
const route = require('./routes/route')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const expressAsync = require("express-async-handler")
// const dfjkghf = require("../frontend/public/uploads")

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use(cookieParser())
app.use(express.static("../../frontend/public/uploads"))

require('./DB/conn')

app.use(route)

app.listen(5000, () => {
    console.log("server listening...")
})