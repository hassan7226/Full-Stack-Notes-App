
import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { Link } from "react-router-dom";

const NotesCard = ({ note }) => {
  const { updateNote, deleteNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState({
    title: note.title,
    content: note.content,
  });

/*   useEffect(() => {
    if (note) {
      setEditedContent({
        title: note.title,
        content: note.content,
      });
    }
  }, [note]); */

  const handleSave = async () => {
    if (
      !editedContent.title.trim() ||
      !editedContent.content.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await updateNote(note._id, editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await deleteNote(note._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5 hover:shadow-xl transition duration-300 h-64 sm:h-72 flex flex-col overflow-hidden">

      {isEditing ? (
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Enter title"
            value={editedContent.title}
            onChange={(e) =>
              setEditedContent({
                ...editedContent,
                title: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            rows="4"
            placeholder="Enter content"
            value={editedContent.content}
            onChange={(e) =>
              setEditedContent({
                ...editedContent,
                content: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3">

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save
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
          <div className="mb-3 flex-1 overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
              {note.title}
            </h2>

            <p
              className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              {note.content}
            </p>
          </div>

          <div className="text-xs sm:text-sm text-gray-500 mb-3 mt-auto">
            {note.createdAt
              ? new Date(note.createdAt).toLocaleString()
              : "No Date"}
          </div>

          <div className="flex gap-2 sm:gap-3">

            <Link
              to={`/note/${note._id}`}
              className="bg-slate-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-700 transition text-sm sm:text-base"
            >
              View
            </Link>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
            >
              ✏️ Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
            >
              🗑 Delete
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default NotesCard; 














/* import React from 'react'
import {useContext, useState} from 'react'
import { NoteContext } from '../context/NoteContext.jsx'



const NotesCard = (note) => {
    const {updateNote,deleteNote } = useContext(NoteContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState({
        title: note.title,
        content: note.content
    });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedContent.title}
            onChange={(e) => setEditedContent({...editedContent, title: e.target.value})}
          />
          <textarea
            value={editedContent.content}
            onChange={(e) => setEditedContent({...editedContent, content: e.target.value})}
          />
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          <button onClick={() => {
            updateNote(note._id, editedContent);
            setIsEditing(false);
          }}>Save</button>
        </div>
      ) : (
        <div>
            <div className="mb-2">
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p className="text-blue-600">{note.content}</p>
          </div>
          <div className="flex space-x-2 mt-2">
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit
            </button>
            <button onClick={() => deleteNote(note._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        <p className="text-sm text-gray-500">
          {new Date(note.createdAt).toLocaleString()}
        </p>
      
        </div>
      )}
       

    </div>
  )
}

export default NotesCard
 */