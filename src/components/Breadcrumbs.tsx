// BreadcrumbNav.tsx
import React, { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/").filter(Boolean);

  const crumbs: { label: string; icon?: JSX.Element; to?: string }[] = [];

  // Check if we're coming from master plan (360 icon navigation)
  const isFromMasterPlan = pathname.startsWith("/exterior");

  crumbs.push({
    label: '',
    icon: <img src="/eastville.png" alt="Location" style={{ height: 30 }} />, 
    to: "/"
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
          label: `Floor ${floorId}`,
          to: `/clusterView/${clusterId}/${floorId}`,
        });
        crumbs.push({ label: "360 View" });
      }
    }
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
                <Link to={crumb.to} className="text-decoration-none">
                  {crumb.icon}
                  {crumb.label}
                </Link>
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
