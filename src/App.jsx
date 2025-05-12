import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CanvasScene from "./components/CanvasScene";
import ChatInterview from "./components/ChatInterview";
import Results from "./components/results";
import Level1 from "./levels/level1";
import Stage3 from "./Pages/Stage3";
import ThanksPage from "./Pages/ThanksPage";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<CanvasScene />} />
        <Route path="/stage-1" element={<Level1/>} />
        <Route path="/stage-2" element={<ChatInterview/>} />
        <Route path="/stage-3" element={<Stage3/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/level-1" element={<Level1/>} />
        <Route path="/thankyou" element={<ThanksPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
