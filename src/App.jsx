import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CanvasScene from "./components/CanvasScene";
import ChatInterview from "./components/ChatInterview";
import Results from "./components/results";
import Stage1 from "./Pages/Stage2";
import Level1 from "./levels/level1";
import Test from "./Pages/test";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<CanvasScene />} />
        <Route path="/stage-1" element={<Stage1/>} />
        <Route path="/stage-2" element={<ChatInterview/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/level-1" element={<Level1/>} />
        <Route path="/test" element={<Test/>} />
      </Routes>
    </Router>
  );
}

export default App;
