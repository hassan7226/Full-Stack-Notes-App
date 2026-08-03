import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NoteContext } from "../context/NoteContext.jsx";

const NoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, loading, token, updateNote, deleteNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedContent, setEditedContent] = useState({ title: "", content: "" });

  const note = notes.find((n) => n._id === id);

  useEffect(() => {
    if (note) {
      setEditedContent({
        title: note.title,
        content: note.content,
      });
    }
  }, [note]);

  const handleSave = async () => {
    if (!editedContent.title.trim() || !editedContent.content.trim()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setIsSaving(true);
      await updateNote(note._id, editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await deleteNote(note._id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-0 py-4 sm:py-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-8 animate-pulse">
          <div className="flex items-start justify-between gap-3 mb-6">
            <div className="h-10 w-2/3 bg-gray-200 rounded-lg" />
            <div className="h-10 w-20 bg-gray-200 rounded-lg" />
          </div>
          <div className="h-4 w-40 bg-gray-200 rounded mb-8" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    const title = !token ? "Session expired" : "Note deleted";
    const message = !token
      ? "Your session is no longer active. Please login again to continue."
      : "This note no longer exists or is not available in your account.";

    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg w-full max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">{title}</h2>
          <p className="text-gray-600 mb-5">{message}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Back to Home
            </Link>
            {!token && (
              <Link
                to="/login"
                className="inline-block bg-slate-200 text-slate-800 px-5 py-2 rounded-lg hover:bg-slate-300 transition"
              >
                Login Again
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-0 py-4 sm:py-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-8">
        {isEditing ? (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Edit Note</h1>
              <Link
                to="/"
                className="shrink-0 bg-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-300 transition text-sm"
              >
                Back
              </Link>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={editedContent.title}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    title: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Content</label>
              <textarea
                rows="10"
                value={editedContent.content}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    content: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3 mb-4">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 break-words">{note.title}</h1>
              <Link
                to="/"
                className="shrink-0 bg-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-300 transition text-sm"
              >
                Back
              </Link>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              {note.createdAt ? new Date(note.createdAt).toLocaleString() : "No Date"}
            </p>

            <article className="text-gray-800 whitespace-pre-line break-words text-base sm:text-lg leading-relaxed mb-8">
              {note.content}
            </article>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteView;
