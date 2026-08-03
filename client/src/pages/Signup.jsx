import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NoteContext } from "../context/NoteContext.jsx";

const Signup = () => {
  const { signup } = useContext(NoteContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup({ username, email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Signup failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-5 sm:p-6 rounded-xl shadow">
      <h2 className="text-xl sm:text-2xl mb-4">Sign Up</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm sm:text-base">
          Username
          <input
            className="w-full border p-2 mt-1 rounded-lg text-sm sm:text-base"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm sm:text-base">
          Email
          <input
            className="w-full border p-2 mt-1 rounded-lg text-sm sm:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm sm:text-base">
          Password
          <input
            className="w-full border p-2 mt-1 rounded-lg text-sm sm:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg mt-2 text-sm sm:text-base" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
