import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Createnote from './pages/Createnote';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoteView from './pages/NoteView';



function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/create-note" element={<Createnote />} />
        <Route path="/note/:id" element={<NoteView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;