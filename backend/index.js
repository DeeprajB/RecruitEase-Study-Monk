const express = require("express")
const userRouter = require("./routes/userRoutes")
const mongoose = require("mongoose")
require('dotenv').config()

const app = express()
app.use("/users",userRouter)

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(4000, ()=>{
        console.log('Server started on port 4000')
    })
})
.catch((error) => {
    console.log(error)
})

