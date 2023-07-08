const express = require("express")
const userRouter = require("./routes/userRoutes")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const candidateRouter = require("./routes/candidateRoutes")
require('dotenv').config()

const app = express()
app.use(cors());
app.use(express.json())
app.get("/", (req,res) => {
    res.send("RecruitEase Backend!");
})
app.use("/users",userRouter)
app.use("/candidate",candidateRouter)

const port = process.env.PORT || 4000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Mongodb connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }).catch((err) => {
    console.log({ err });
    process.exit(1);
  });


