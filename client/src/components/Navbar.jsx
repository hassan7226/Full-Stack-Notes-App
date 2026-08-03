import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { NoteContext } from "../context/NoteContext.jsx";

const Navbar = () => {
  const { token, logout } = useContext(NoteContext);

  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wide"
        >
          📝 Notes App
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 w-full sm:w-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium text-sm sm:text-base transition ${isActive ? "text-yellow-300" : "text-white hover:text-yellow-300"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-note"
            className={({ isActive }) =>
              `px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition ${
                isActive
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-white text-indigo-600 hover:bg-yellow-300"
              }`
            }
          >
            + Create Note
          </NavLink>

          {token ? (
            <button onClick={logout} className="px-3 sm:px-4 py-2 rounded bg-white text-indigo-600 text-sm sm:text-base">
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `font-medium text-sm sm:text-base transition ${isActive ? "text-yellow-300" : "text-white hover:text-yellow-300"}`}>
                Login
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => `font-medium text-sm sm:text-base transition ${isActive ? "text-yellow-300" : "text-white hover:text-yellow-300"}`}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;