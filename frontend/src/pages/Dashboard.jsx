import React, { useState, useEffect, useRef } from "react";
import { getData } from "../context/userContext";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { Plus, Trash2, Save, FileText, ArrowLeft, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const isLoggedIn = !!user;
  const hasFetchedNotes = useRef(false);

  useEffect(() => {
    if (hasFetchedNotes.current) return;
    hasFetchedNotes.current = true;
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${API_BASE_URL}/notes`, { headers });
      setNotes(res.data.notes || []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      const localNotes = JSON.parse(localStorage.getItem("local_notes") || "[]");
      setNotes(localNotes);
    }
  };

  const handleSaveNote = async () => {
    if (!isLoggedIn) return;
    if (!newNote.title || !newNote.content) {
      toast.error("Please fill in both title and content");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Session not found. Please log in again.");
        return;
      }
      const res = await axios.post(
        `${API_BASE_URL}/notes/create`,
        newNote,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([...notes, res.data.note]);
      toast.success("Note saved to database");
    } catch (error) {
      toast.error("Cloud saving failed.");
    }
    setNewNote({ title: "", content: "" });
  };

  const editNote = (id) => {
    if (!isLoggedIn) return;
    const target = notes.find((n) => (n._id || n.id) === id);
    if (!target) return;
    const title = prompt("Edit title", target.title);
    const content = prompt("Edit content", target.content);
    if (title == null || content == null) return;
    setNotes(notes.map((n) => ((n._id || n.id) === id ? { ...n, title, content } : n)));
  };

  const deleteNote = (id) => {
    if (!isLoggedIn) return;
    const updatedNotes = notes.filter((n) => (n._id || n.id) !== id);
    setNotes(updatedNotes);
    toast.success("Note deleted");
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <button
              onClick={() => navigate("/")}
              className="mb-3 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Workspace</h1>
            <p className="text-emerald-600/80 text-sm font-semibold mt-1">
              {isLoggedIn ? "Node: Auth (Cloud)" : "Node: Guest (Read Only)"}
            </p>
          </div>
          {isLoggedIn && (
            <button
              onClick={logoutHandler}
              className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Logout
            </button>
          )}
        </header>

        {/* Note Input */}
        {isLoggedIn && <div className="bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-emerald-500/20 shadow-[0_8px_30px_rgb(16,185,129,0.05)] p-6 mb-10 transition-all duration-300 hover:border-emerald-500/40">
          <input
            type="text"
            placeholder="Initialize Title..."
            className="w-full text-xl font-bold bg-transparent mb-3 focus:outline-none placeholder:text-slate-300 text-slate-800 border-b-2 border-emerald-500/10 focus:border-emerald-500 transition-colors py-1"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            placeholder="Enter technical specifications or notes..."
            className="w-full h-32 resize-none bg-transparent focus:outline-none text-slate-600 text-sm leading-relaxed placeholder:text-slate-300"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveNote}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95 font-bold text-sm"
            >
              <Save size={16} /> Save Document
            </button>
          </div>
        </div>}

        {/* Notes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {notes.map((note) => (
            <div 
              key={note._id || note.id} 
              className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border-2 border-emerald-500/10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:border-emerald-500 hover:shadow-[0_12px_24px_rgb(16,185,129,0.08)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-emerald-500/10 transition-colors" />
               
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <div className="p-1.5 bg-emerald-100 rounded-lg">
                    <FileText size={16} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-md truncate max-w-[150px]">{note.title}</h3>
                </div>
                {isLoggedIn && <div className="flex items-center gap-2">
                  <button
                    onClick={() => editNote(note._id || note.id)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note._id || note.id)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-wrap line-clamp-4">{note.content}</p>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <div className="inline-flex p-5 bg-emerald-50 rounded-full mb-3 border-2 border-emerald-500/20">
                <Plus size={24} className="text-emerald-500" />
              </div>
              <p className="text-slate-400 font-medium whitespace-nowrap">Null Documents Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
