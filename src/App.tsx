import './App.css'
import GoogleMapWrapper from "./pages/GoogleMapWrapper";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MasterPlan from './pages/MasterPlan';
import ClusterView from './pages/ClusterView';
import NotFoundPage from './pages/NotFoundPage';
import React, { JSX, Suspense } from 'react';
// import SpinnerPage from "./pages/SpinnerPage"; // Ensure this path is correct or create the file if it doesn't exist
import Login from './pages/Login'; // Ensure this path is correct or create the file if it doesn't exist
import VillaView from './pages/VillaView';
import PanoramaViewer from './pages/PanoramaViewer';
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import Callback from './pages/Callback';
import UpdateVillaStatus from './pages/UpdateVillaStatus';
import ContactForm from './components/ContactForm';
import BreadcrumbNav from './components/Breadcrumbs';


// 🔹 Protected Route Component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = Cookies.get("token"); // Read token from cookies
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<h1>Looding...</h1>}>
          <BreadcrumbNav />
          <Routes>
            <Route path="/" element={<GoogleMapWrapper />} />
            <Route path="/login" element={<Login />} />
            <Route path="/master-plan" element={<MasterPlan />} />
            <Route path="/callback" element={<ProtectedRoute element={<Callback />} />} />
            <Route path="/villa-status" element={<ProtectedRoute element={<UpdateVillaStatus />} />} />
            <Route path="/clusterView/:clusterId" element={<ClusterView />} />
            <Route path="/clusterView/:clusterId/:FloorId" element={<VillaView />} />
            <Route path="/clusterView/:clusterId/:FloorId/image" element={<PanoramaViewer />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <ContactForm />

      </Router>
    </>
  )
}

export default App
