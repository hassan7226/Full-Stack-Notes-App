import { createContext } from "react";

export const NoteContext = createContext();
import { useState, useEffect } from "react";
import API from "../../api/url.js";
import { useNavigate } from "react-router-dom";

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    // ensure axios has Authorization header when token exists
    useEffect(() => {
        if (token) {
            API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete API.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const getNotes = async () => {
        setLoading(true);
        try {
            const response = await API.get("/notes/get-notes");
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createNote = async (note) => {
        const response = await API.post("/notes/create-note", note);
        setNotes((prevNotes) => [...prevNotes, response.data]);
    };
    const updateNote = async (id, note) => {
        const response = await API.put(`/notes/update-note/${id}`, note);
        setNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === id ? response.data : n))
);
    };

    const deleteNote = async (id) => {
        await API.delete(`/notes/delete-note/${id}`);
        setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id));
    };

    // Auth: signup, login, logout
    const signup = async ({ username, email, password }) => {
        const resp = await API.post("/users/register", { username, email, password });
        const newToken = resp.data.token;
        if (newToken) {
            localStorage.setItem("token", newToken);
            // set header immediately so subsequent requests use it
            API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            setToken(newToken);
            // load user's notes right away
            await getNotes();
        }
        return resp;
    };

    const login = async ({ email, password }) => {
        const resp = await API.post("/users/login", { email, password });
        const newToken = resp.data.token;
        if (newToken) {
            localStorage.setItem("token", newToken);
            // set header immediately so subsequent requests use it
            API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            setToken(newToken);
            // fetch notes for the logged-in user
            await getNotes();
        }
        return resp;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setNotes([]);
        delete API.defaults.headers.common["Authorization"];
        navigate("/");
    };

    return (
        <NoteContext.Provider
            value={{
                notes,
                loading,
                getNotes,
                createNote,
                updateNote,
                deleteNote,
                signup,
                login,
                logout,
                token,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};