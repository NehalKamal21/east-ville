// BreadcrumbNav.tsx
import React, { JSX, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

// Helper function to convert floorId to user-friendly names
const getFloorDisplayName = (floorId: string): string => {
  switch (floorId) {
    case 'groundFloor':
      return 'Ground Floor';
    case 'firstFloor':
      return 'First Floor';
    case 'secondFloor':
      return 'Second Floor';
    case 'Roof':
      return 'Roof';
    default:
      return floorId; // Fallback to original if no match
  }
};

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const [isNavigatingToMasterPlan, setIsNavigatingToMasterPlan] = useState(false);

  const crumbs: { label: string; icon?: JSX.Element; to?: string; onClick?: () => void }[] = [];

  // Check if we're coming from master plan (360 icon navigation)
  const isFromMasterPlan = pathname.startsWith("/exterior");

  // Handle navigation to master plan with loading screen
  const handleMasterPlanNavigation = () => {
    setIsNavigatingToMasterPlan(true);
    navigate("/");
  };

  // Reset loading state when we're on the master plan page
  useEffect(() => {
    if (pathname === "/" && isNavigatingToMasterPlan) {
      // Small delay to ensure the master plan has time to start loading
      const timer = setTimeout(() => {
        setIsNavigatingToMasterPlan(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, isNavigatingToMasterPlan]);

  crumbs.push({
    label: '',
    icon: <img src="/eastville.png" alt="Location" style={{ height: 30 }} />, 
    to: "/",
    onClick: handleMasterPlanNavigation
  });

  if (segments[0] === "master-plan") {
    crumbs.push({ label: "Master Plan" });
  }

  if (segments[0] === "exterior") {
    const iconId = segments[1];
    if (iconId) {
      crumbs.push({ label: `360° View - ${iconId}` });
    } else {
      crumbs.push({ label: "Exterior Panorama" });
    }
  }

  if (segments[0] === "clusterView") {
    const clusterId = segments[1];
    const floorId = segments[2];
    const isImage = segments.includes("image");

    // If coming from master plan and viewing image, show only icon
    if (isFromMasterPlan && isImage) {
      // Don't add any additional breadcrumbs, just show the icon
    } else {
      if (clusterId) {
        crumbs.push({
          label: clusterId,
          to: `/clusterView/${clusterId}`,
        });
      }

      if (floorId && !isImage) {
        crumbs.push({
          label: `${floorId}`,
          to: `/clusterView/${clusterId}/${floorId}`,
        });
      }

      if (isImage && floorId && clusterId) {
        crumbs.push({
          label: `${getFloorDisplayName(floorId)}`,
          to: `/clusterView/${clusterId}/${floorId}`,
        });
        crumbs.push({ label: "360 View" });
      }
    }
  }

  // Show loading screen when navigating to master plan
  if (isNavigatingToMasterPlan) {
    return <LoadingScreen />;
  }

  return (
    <div className="breadcrumb-wrapper px-3 py-2 sticky-top" style={{ zIndex: 100 }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb custom-breadcrumb mb-0">
          {crumbs.map((crumb, idx) => (
            <li 
              key={idx} 
              className={`breadcrumb-item ${!crumb.to ? 'active' : ''}`}
              aria-current={!crumb.to ? 'page' : undefined}
            >
              {crumb.to ? (
                crumb.onClick ? (
                  <button 
                    onClick={crumb.onClick} 
                    className="text-decoration-none border-0 bg-transparent text-white p-0"
                    style={{ cursor: 'pointer', outline: 'none' }}
                  >
                    {crumb.icon}
                    {crumb.label}
                  </button>
                ) : (
                  <Link to={crumb.to} className="text-decoration-none">
                    {crumb.icon}
                    {crumb.label}
                  </Link>
                )
              ) : (
                <>
                  {crumb.icon}
                  {crumb.label}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadcrumbNav;
