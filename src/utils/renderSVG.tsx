import React, { JSX } from "react";

import AGroundFloor from "../SVGs/ClusterA/AGroundFloor";
import AFirstFloor from "../SVGs/ClusterA/AFirstFloor";
import ASecondFloor from "../SVGs/ClusterA/ASecondFloor";
import ARoof from "../SVGs/ClusterA/ARoof";

import BGroundFloor from "../SVGs/ClusterB/BGroundFloor";
import BFirstFloor from "../SVGs/ClusterB/BFirstFloor";
import BSecondFloor from "../SVGs/ClusterB/BSecondFloor";
import BRoof from "../SVGs/ClusterB/BRoof";

import TWGroundFloor from "../SVGs/ClusterTW/TWGroundFloor";
import TWFirstFloor from "../SVGs/ClusterTW/TWFirstFloor";
import TWSecondFloor from "../SVGs/ClusterTW/TWSecondFloor";
import TWRoof from "../SVGs/ClusterTW/TWRoof";

export const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  
  export const renderSVG = (clusterId: string, selectedFloor: { value: string, key: string }) => {
debugger;
    const map: Record<string, JSX.Element> = {
      AGroundFloor: <AGroundFloor />,
      AFirstFloor: <AFirstFloor />,
      ASecondFloor: <ASecondFloor />,
      ARoof: <ARoof />,
      BGroundFloor: <BGroundFloor />,
      BFirstFloor: <BFirstFloor />,
      BSecondFloor: <BSecondFloor />,
      BRoof: <BRoof />,
      TWGroundFloor: <TWGroundFloor />,
      TWFirstFloor: <TWFirstFloor />,
      TWSecondFloor: <TWSecondFloor />,
      TWRoof: <TWRoof />,
    };
  
    const prefix = clusterId?.startsWith("A")
      ? "A"
      : clusterId?.startsWith("B")
        ? "B"
        : clusterId?.startsWith("T")
          ? "TW"
          : "";
    return map[`${prefix}${capitalize(selectedFloor.key)}`] || null;
  };
  