import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { JSX, Suspense, lazy } from 'react';
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import LoadingScreen from "./LoadingScreen";
import ContactForm from './ContactForm';
import LocationButton from './LocationButton';
import BreadcrumbNav from './Breadcrumbs';
import { ContactModalProvider } from '../utils/ContactModalContext';
import { loadingManager } from '../utils/loadingManager';
import { testMasterPlanImage } from '../utils/testMasterPlanImage';

// 🔹 Lazy-loaded Pages
const GoogleMapWrapper = lazy(() => import("../pages/GoogleMapWrapper"));
const MasterPlan = lazy(() => import("../pages/MasterPlan"));
const ClusterView = lazy(() => import("../pages/ClusterView"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const Login = lazy(() => import("../pages/Login"));
const VillaView = lazy(() => import("../pages/VillaView"));
const PanoramaViewer = lazy(() => import("../pages/PanoramaViewer"));
const Callback = lazy(() => import("../pages/Callback"));
const UpdateVillaStatus = lazy(() => import("../pages/UpdateVillaStatus"));

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

const AppWithLoading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Initialize loading manager
    loadingManager.initialize();

    // Test master plan image loading
    testMasterPlanImage();

    // Subscribe to loading state changes
    const unsubscribe = loadingManager.subscribe((loading) => {
      setIsLoading(loading);
      
      if (!loading) {
        // Add a delay to ensure smooth transition
        setTimeout(() => {
          setShowApp(true);
        }, 500);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLoadingComplete = () => {
    setShowApp(true);
  };

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ContactModalProvider>
          {/* Show loading screen until everything is loaded */}
          {!showApp && (
            <LoadingScreen onLoadingComplete={handleLoadingComplete} />
          )}
          
          {/* Show app content when loading is complete */}
          {showApp && (
            <Router>
              <Suspense fallback={<LoadingScreen />}>
                <BreadcrumbNav />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<MasterPlan />} />
                  <Route path="/exterior/:iconId" element={<PanoramaViewer />} />
                  <Route path="/exterior" element={<Navigate to="/" />} />
                  <Route path="/map" element={<GoogleMapWrapper />} />
                  <Route path="/callback" element={<ProtectedRoute element={<Callback />} />} />
                  <Route path="/villa-status" element={<ProtectedRoute element={<UpdateVillaStatus />} />} />
                  <Route path="/clusterView/:clusterId" element={<ClusterView />} />
                  <Route path="/clusterView/:clusterId/:FloorId" element={<VillaView />} />
                  <Route path="/clusterView/:clusterId/:FloorId/image" element={<PanoramaViewer />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
              <ContactForm />
              <LocationButton />
            </Router>
          )}
        </ContactModalProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default AppWithLoading; 