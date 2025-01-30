const express = require("express");
const Project = require("../models/Project.js");
const authMiddleware = require("../middleware/auth.js");
const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name } = req.body; 

        const newProject = new Project({
            name,  
            userId: req.userId  
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


router.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.userId });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
