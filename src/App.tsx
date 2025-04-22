import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { JSX, Suspense, lazy } from 'react';
import React from 'react';
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import LoadingScreen from "./components/LoadingScreen";
import ContactForm from './components/ContactForm';
import BreadcrumbNav from './components/Breadcrumbs';

// 🔹 Lazy-loaded Pages
const GoogleMapWrapper = lazy(() => import("./pages/GoogleMapWrapper"));
const MasterPlan = lazy(() => import("./pages/MasterPlan"));
const ClusterView = lazy(() => import("./pages/ClusterView"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Login = lazy(() => import("./pages/Login"));
const VillaView = lazy(() => import("./pages/VillaView"));
const PanoramaViewer = lazy(() => import("./pages/PanoramaViewer"));
const Callback = lazy(() => import("./pages/Callback"));
const UpdateVillaStatus = lazy(() => import("./pages/UpdateVillaStatus"));

// 🔐 Protected Route Wrapper
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = Cookies.get("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
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
    </React.StrictMode>
  );
}

export default App;
