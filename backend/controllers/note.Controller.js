import { Note } from "../models/noteModel.js";

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userId;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and content are required" });
        }

        const note = await Note.create({
            userId,
            title,
            content
        });

        return res.status(201).json({
            success: true,
            message: "Note created successfully",
            note
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const notes = await Note.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            notes
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
