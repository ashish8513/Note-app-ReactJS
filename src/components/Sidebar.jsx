import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Sidebar() {
  const [addNote, setAddNote] = useState(false);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  const handleNewNoteToggle = () => {
    setAddNote(!addNote);
    setText("");
  };

  const handleSubmitNote = () => {
    if (text.trim()) {
      setNotes([...notes, text]);
      setText("");
      setAddNote(false);
    }
  };

  const handleDeleteNote = (index) => {
    alert("Are you sure you want to delete")
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col px-4 py-3 items-center w-full md:w-1/6 bg-gray-100 h-screen space-y-2">
    
    <button
      className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      onClick={handleNewNoteToggle}
    >
      {addNote ? "Cancel Note" : "New Note"}
    </button>
  
    {addNote && (
      <div className="w-full space-y-2">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md "
          placeholder="Enter note title"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmitNote()}
        />
        <button
          className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          onClick={handleSubmitNote}
        >
          Submit Note
        </button>
      </div>
    )}
  
    <ul className="w-full space-y-2 overflow-y-auto">
      {notes.map((note, index) => (
        <li
          key={index}
          className="flex items-center justify-between w-full p-2 bg-gray-100 rounded-md"
        >
          <span className="text-gray-800 font-medium tracking-wide">{note}</span>
          <button
            className="p-1 text-red-500 hover:text-red-600"
            onClick={() => handleDeleteNote(index)}
          >
            <DeleteIcon />
          </button>
        </li>
      ))}
    </ul>
  </div>
  
  
  );
}

export default Sidebar;
