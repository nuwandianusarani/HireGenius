import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/InitialPage';
import Form from './Pages/JobCreate';
import JobView from './Pages/JobViewPage';
import CandidateView from './Pages/CandidateView';
import ProgerssPage from './Pages/ProgressPage';
import JobList from './Pages/JobList';
import CandidatesList from './Pages/CandidatesList';
import CandidateCharts from './Pages/CandidateCharts';

import './App.css'


function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={< Login/>} />
   <Route path="/home" element={< Home/>} />
   <Route path="/form" element={< Form/>} />
   <Route path="/jobview" element={< JobView/>} />
   <Route path="/form" element={< Form/>} />
   <Route path="/view" element={< CandidateView/>} />
   <Route path="/progress" element={< ProgerssPage/>} />
   <Route path="/joblist" element={<JobList />} />
   <Route path="/candidates/:jobId" element={<CandidatesList />} />
   <Route path="/candidate-charts/:candidateID" element={<CandidateCharts />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
