import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../context/NoteContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const CreateNote = () => {
  const { createNote } = useContext(NoteContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useContext(NoteContext);

  useEffect(() => {
    if (!token) {
      // redirect to login and preserve intended destination
      navigate("/login", { replace: true, state: { from: location.pathname } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await createNote(note);
      navigate("/");
    } 
    catch (error) {
      console.error(error);
      alert("Failed to create note.");
    }
  };

  return (
    <div className="flex justify-center items-start py-6 sm:py-10 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-5 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-2">
          Create New Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Enter note title"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
              Content
            </label>

            <textarea
              name="content"
              rows="5"
              value={note.content}
              onChange={handleChange}
              placeholder="Write your note..."
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-sm sm:text-base"
          >
            Create Note
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateNote;