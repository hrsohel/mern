const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/food-corner", {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connection Established.")
}).catch((e) => {
    console.log(`Fail to connect database!Reson: ${e}`)
})