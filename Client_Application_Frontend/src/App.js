
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import CVUploadForm from './components/CVUploadForm';
import FormPopUp from './Pages/Form';
import InitialPage from './Pages/InitialPage';
import JobDetails from './Pages/JobDetails';
import ConfirmationPage from './Pages/ConfirmationPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={< InitialPage/>} />
    <Route path="/cvuploaddemo" element={<CVUploadForm/>} />
    <Route path="/form/:jobID" element={<FormPopUp />} />
    <Route path="/job-details/:jobID" element={<JobDetails/>} />
     <Route path="/confirmation/:candidateId/:jobID" element={<ConfirmationPage />} />
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
