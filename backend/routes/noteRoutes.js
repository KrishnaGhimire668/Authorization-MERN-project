import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createNote, getNotes } from "../controllers/note.Controller.js";

const router = express.Router();

router.get("/", isAuthenticated, getNotes);
router.post("/create", isAuthenticated, createNote);

export default router;
