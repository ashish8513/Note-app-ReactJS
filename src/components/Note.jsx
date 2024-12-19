import React, { useState } from "react";

function Note() {
  const [addNote, setAddNote] = useState(false);
  const handleNewNoteToggle = () => {
    setAddNote(!addNote);
    // setText("");
  };
  return (
    <div className=" bg-blue-500 w-full h-10">
      <div className="px-4 py-2" onClick={handleNewNoteToggle}>
        {addNote ? "Cancel Note" : "New Note"}
      </div>
      <div className="w-full border border-spacing-0 h-12 px-4">
        
      </div>
    </div>
  );
}

export default Note;
