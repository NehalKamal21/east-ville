import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { JSX, Suspense, lazy } from 'react';
import React from 'react';
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import LoadingScreen from "./components/LoadingScreen";
import ContactForm from './components/ContactForm';
import LocationButton from './components/LocationButton';
import BreadcrumbNav from './components/Breadcrumbs';
import { ContactModalProvider } from './utils/ContactModalContext';
import { ModalProvider } from './utils/ModalContext';
import PanoramaImageValidator from './components/PanoramaImageValidator';
import SpecificImageValidator from './components/SpecificImageValidator';

// 🔹 Lazy-loaded Pages
const GoogleMapWrapper = lazy(() => import("./pages/GoogleMapWrapper"));
const MasterPlan = lazy(() => import("./pages/MasterPlan"));
const ClusterView = lazy(() => import("./pages/ClusterView"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Login = lazy(() => import("./pages/Login"));
const VillaView = lazy(() => import("./pages/VillaView"));
const IconPanoramaViewer = lazy(() => import("./pages/IconPanoramaViewer"));
const ClusterPanoramaViewer = lazy(() => import("./pages/ClusterPanoramaViewer"));
const Callback = lazy(() => import("./pages/Callback"));
const UpdateVillaStatus = lazy(() => import("./pages/UpdateVillaStatus"));
import "./styles/main.scss";


// 🔐 Protected Route Wrapper
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = Cookies.get("token");
  return token ? element : <Navigate to="/login" />;
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <ContactModalProvider>
            <Router>
            <Suspense fallback={<LoadingScreen />}>
              <BreadcrumbNav />
              <Routes>
                {/* <Route path="/" element={<GoogleMapWrapper />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<MasterPlan />} />
                <Route path="/exterior/:iconId" element={<IconPanoramaViewer />} />
                <Route path="/map" element={<GoogleMapWrapper />} />
                <Route path="/callback" element={<ProtectedRoute element={<Callback />} />} />
                <Route path="/villa-status" element={<ProtectedRoute element={<UpdateVillaStatus />} />} />
                <Route path="/clusterView/:clusterId" element={<ClusterView />} />
                <Route path="/clusterView/:clusterId/:FloorId" element={<VillaView />} />
                <Route path="/clusterView/:clusterId/:FloorId/image" element={<ClusterPanoramaViewer />} />
                <Route path="/panorama-validator" element={<PanoramaImageValidator />} />
                <Route path="/specific-validator" element={<SpecificImageValidator />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <ContactForm />
            <LocationButton />
          </Router>
          </ContactModalProvider>
        </ModalProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
