import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CanvasScene from "./components/CanvasScene";
import ChatInterview from "./components/ChatInterview";
// import Results from "./components/results";
import Level1 from "./levels/level1";
import Stage3 from "./Pages/Stage3";
import ThanksPage from "./Pages/ThanksPage";
import Login from "./auth/Login";
import DevOps from "./Pages/DevOps";
import SkillsMap from "./Pages/SkillsMap";
import GameBoard from './Pages/GameBoard';
import PMInstructions from "./Pages/PMInstructions";

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Home />} />
        <Route path="/dashboard" element={<CanvasScene />} />
        <Route path="/stage-1" element={<Level1/>} />
        <Route path="/stage-2" element={<ChatInterview/>} />
        <Route path="/stage-3" element={<Stage3/>} />
        {/* <Route path="/results" element={<Results/>} /> */}
        <Route path="/level-1" element={<Level1/>} />
        <Route path="/thankyou" element={<ThanksPage/>} />
        <Route path="/DevOps" element={<DevOps/>} />
        <Route path="/SkillsMap" element={<SkillsMap/>} />
        <Route path="/GameBoard" element={<GameBoard/>} />
        <Route path="/PMInstructions" element={<PMInstructions/>} />
      </Routes>
    </Router>
  );
}

export default App;
