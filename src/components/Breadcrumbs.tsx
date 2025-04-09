// BreadcrumbNav.tsx
import React, { JSX } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/").filter(Boolean);

  const crumbs: { label: string; icon?: JSX.Element; to?: string }[] = [];

  crumbs.push({ label: "Location", to: "/" });

  if (segments[0] === "master-plan") {
    crumbs.push({ label: "Master Plan" });
  }

  if (segments[0] === "clusterView") {
    const clusterId = segments[1];
    const floorId = segments[2];
    const isImage = segments.includes("image");

    crumbs.push({ label: "Master Plan", to: "/master-plan" });

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

  return (
    <div className="breadcrumb-wrapper scrollable-breadcrumb">

      <Breadcrumb className="custom-breadcrumb">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <Breadcrumb.Item
              key={index}
              linkAs={crumb.to && !isLast ? Link : undefined}
              linkProps={crumb.to && !isLast ? { to: crumb.to } : undefined}
              active={isLast || !crumb.to}
            >
              {crumb.label}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;
