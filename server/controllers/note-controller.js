import Note from "../models/note.model.js";


export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const ownerId = req.user?.id || req.user?._id;
    if (!ownerId) return res.status(401).json({ message: 'Unauthorized' });
    const newNote = new Note({ title, content, owner: ownerId });
    await newNote.save();

    console.log(newNote);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
};


export const getNotes = async (req, res) => {
  try {
    const ownerId = req.user?.id || req.user?._id;
    if (!ownerId) return res.status(401).json({ message: 'Unauthorized' });
    const notes = await Note.find({ owner: ownerId }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error(" Getted Notes Error:", error);

    res.status(500).json({
      message: "Error fetching notes",
      error: error.message,
    });
  }
}; 

export const updateNote = async (req,res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const ownerId = req.user?.id || req.user?._id;
    if (!ownerId) return res.status(401).json({ message: 'Unauthorized' });
    const updatedNote = await Note.findOneAndUpdate({ _id: id, owner: ownerId }, { title, content }, { new: true });
    if (!updatedNote) return res.status(404).json({ message: 'Note not found or not authorized' });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(" Update Note Error:", error);
    res.status(500).json({ message: "Error updating note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.user?.id || req.user?._id;
    if (!ownerId) return res.status(401).json({ message: 'Unauthorized' });
    const deleted = await Note.findOneAndDelete({ _id: id, owner: ownerId });
    if (!deleted) return res.status(404).json({ message: 'Note not found or not authorized' });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(" Delete Note Error:", error);
    res.status(500).json({ message: "Error deleting note" });
  }
};