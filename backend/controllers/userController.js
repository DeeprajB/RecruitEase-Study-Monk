const { existsSync } = require("fs")
const user = require("../models/user")
const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const signup = async (req,res) => {

    // Existing User Check
    // Hashed Password
    // User Creation
    // Token Generation

    const { company_name, company_url,username, email, password, industry_type, industry_size, location, details, requirements} = req.body
    try {
        const existingUser = await userModel.findOne({ email: email})
        if (existingUser){
            return res.status(400).json({ message: "User already exists."})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await userModel.create({
            company_name: company_name,
            company_url: company_url,
            username: username,
            email: email,
            password: hashedPassword,
            industry_type: industry_type,
            industry_size: industry_size,
            location: location,
            details: details,
            requirements: requirements
        })

        const token = jwt.sign({ email: result.email, id: result._id}, process.env.SECRET_KEY)
        res.status(201).json({ user: result, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const login = async (req,res) => {
    const {  email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (!existingUser){
            return res.status(404).json({ message: "User doesnt exist."})
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Password is incorrect."})
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.SECRET_KEY)
        res.status(200).json({ user: existingUser, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { signup, login }