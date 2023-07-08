const candidateModel = require("../models/candidate")


const getAll = async (req,res) => {
    try {
        const candidates = await candidateModel.find()
        if (!candidates){
            return res.status(400).json({ message: "Candidates not found"})
        }
        res.status(200).json({ candidates: candidates })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getById = async (req,res) => {
    try {
        const candidateId = req.params.id;
        const candidate = await candidateModel.findById(candidateId)
        console.log(candidate)
        if (!candidate){
            return res.status(400).json({ message: "Candidate not found"})
        }
        res.status(200).json({ candidate: candidate })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const selectById = async (req,res) => {
    try {
        const candidateId = req.params.id;
        const { selected } = req.body;
        await candidateModel.findByIdAndUpdate(candidateId, {
            selected
        });
        const candidate = await candidateModel.findById(candidateId);
        console.log(candidate)
        if (!candidate){
            return res.status(400).json({ message: "Candidate not found"})
        }
        res.status(200).json({ candidate: candidate })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { getAll, getById, selectById }