import './App.css'
import GoogleMapWrapper from "./pages/GoogleMapWrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MasterPlan from './pages/MasterPlan';
import ClusterView from './pages/ClusterView';
import NotFoundPage from './pages/NotFoundPage';
import React, { Suspense } from 'react';
import SpinnerPage from "./pages/SpinnerPage"; // Ensure this path is correct or create the file if it doesn't exist
import VillaView from './pages/VillaView';

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<h1>Looding...</h1>}>
          <Routes>
            <Route path="/" element={<GoogleMapWrapper />} />
            <Route path="/map" element={<MasterPlan />} />
            <Route path="/clusterView/:clusterId" element={<ClusterView />} />
            <Route path="/clusterView/:clusterId/:FloorId" element={<VillaView />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
