import './App.css'
import GoogleMapWrapper from "./components/GoogleMapWrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MasterPlan from './components/MasterPlan';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GoogleMapWrapper />} />
          <Route path="/map" element={<MasterPlan />} />
          <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Handle unknown routes */}
        </Routes>
      </Router>
      {/* <GoogleMapWrapper /> */}
    </>
  )
}

export default App
