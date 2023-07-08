const express = require("express")
const userRouter = require("./routes/userRoutes")
const mongoose = require("mongoose")
const candidateRouter = require("./routes/candidateRoutes")
require('dotenv').config()

const app = express()
app.use(express.json())
app.use("/users",userRouter)
app.use("/candidate",candidateRouter)

module.exports = mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(4000, ()=>{
        console.log('Server started on port 4000')
    })
})
.catch((error) => {
    console.log(error)
})


