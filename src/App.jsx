import React from "react";
import Sidebar from "./components/Sidebar";
import Note from "./components/Note";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Note/>
    </div>
  );
}

export default App;
