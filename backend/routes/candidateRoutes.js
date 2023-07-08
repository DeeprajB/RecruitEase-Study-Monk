const express = require("express")
const { getAll, getById, selectById } = require("../controllers/candidateController")
const candidateRouter = express.Router()

candidateRouter.get("/getAll", getAll)

candidateRouter.get("/:id", getById)

candidateRouter.patch("/:id", selectById)

module.exports = candidateRouter