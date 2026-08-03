import React from 'react'
import { NoteContext } from '../context/NoteContext.jsx'
import { useContext } from 'react'
import NotesCard from '../components/NotesCard.jsx'

const Home = () => {
  const { notes, loading} = useContext(NoteContext);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <p className="text-2xl sm:text-4xl text-gray-600 text-center">Loading notes...</p>
      </div>
    );
  }
  if (notes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <p className="text-2xl sm:text-4xl text-gray-600 text-center">Login to view your notes</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
      {notes.map((note) => (
        <NotesCard key={note._id} note={note} />
      ))}
    </div>
  )
}

export default Home
