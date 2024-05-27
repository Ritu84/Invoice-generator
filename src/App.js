import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import FormGroup from "./components/InputForm/inputForm";
import Download from "./pages/download";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<FormGroup />} />
          <Route exact path="/invoice" element={<Download />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
