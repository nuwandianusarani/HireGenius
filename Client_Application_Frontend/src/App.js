import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import CVUploadForm from './components/CVUploadForm';
import FormPopUp from './Pages/Form';
import InitialPage from './Pages/InitialPage';
import JobDetails from './Pages/JobDetails';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={< InitialPage/>} />
    <Route path="/cvuploaddemo" element={<CVUploadForm/>} />
    <Route path="/form/:jobID" element={<FormPopUp />} />
    <Route path="/job-details/:jobID" element={<JobDetails/>} />
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
