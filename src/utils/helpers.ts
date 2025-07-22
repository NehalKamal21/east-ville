export const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

export const eastVilleLocation: google.maps.LatLngLiteral = {
  lat: 30.04620586690839,
  lng: 31.572817028510652,
};

export const polygonCoordinates: google.maps.LatLngLiteral[] = [
  { lng: -328.4253243, lat: 30.043646 },
  { lng: -328.4289122, lat: 30.0431039 },
  { lng: -328.428719, lat: 30.0444966 },
  { lng: -328.4286761, lat: 30.0451651 },
  { lng: -328.4286547, lat: 30.0455737 },
  { lng: -328.428719, lat: 30.0461865 },
  { lng: -328.4287405, lat: 30.0466693 },
  { lng: -328.4287834, lat: 30.0470964 },
  { lng: -328.4288693, lat: 30.0475049 },
  { lng: -328.4291267, lat: 30.0489405 },
  { lng: -328.4253502, lat: 30.0491913 },
  { lng: -328.4254843, lat: 30.0481056 },
  { lng: -328.4255058, lat: 30.0478688 },
  { lng: -328.4255594, lat: 30.0475764 },
  { lng: -328.4256023, lat: 30.0472978 },
  { lng: -328.4256452, lat: 30.0470007 },
  { lng: -328.425656, lat: 30.046764 },
  { lng: -328.4256667, lat: 30.0464761 },
  { lng: -328.4256667, lat: 30.0460815 },
  { lng: -328.425656, lat: 30.0457334 },
  { lng: -328.4256238, lat: 30.0453016 },
  { lng: -328.4255916, lat: 30.0449163 },
  { lng: -328.4255379, lat: 30.044582 },
  { lng: -328.4254628, lat: 30.0441967 },
  { lng: -328.4253725, lat: 30.0438255 },
  { lng: -328.4253243, lat: 30.0436491 },
];

export const polygonOptions: google.maps.PolygonOptions = {
  fillColor: "lightblue",
  fillOpacity: 0.4,
  strokeColor: "blue",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  draggable: false,
  editable: false,
  geodesic: false,
};

// Function to create marker icons after Google Maps API is loaded
export const createMarkerIcons = () => {
  if (typeof google === 'undefined') {
    return {};
  }

  // Base map pin icon from Flaticon
  const basePinIcon = {
    url: '/map-pin-icon.png',
    scaledSize: new google.maps.Size(60, 60),
    anchor: new google.maps.Point(20, 40), // Anchor at bottom center of pin
  };

  return {
    residential: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
    sports: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
    commercial: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
    education: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
    default: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
  };
};

export const locations = [
  {
    position: { lat: 30.06511172585654, lng: 31.593887180771073 },
    title: "Mountain View iCity",
    type: "residential",
  },
  {
    position: { lat: 30.06025650522822, lng: 31.598553096116312 },
    title: "Palm Hills",
    type: "residential",
  },
  {
    position: { lat: 30.023462004037487, lng: 31.570092734133954 },
    title: "City Gate",
    type: "residential",
  },
  {
    position: { lat: 30.039789441702425, lng: 31.554410853788273 },
    title: "Al Ahly Sporting Club",
    type: "sports",
  },
  {
    position: { lat: 30.031265110957953, lng: 31.540652434331953 },
    title: "The Drive2 by Waterway",
    type: "commercial",
  },
  {
    position: { lat: 30.026657678388094, lng: 31.537908729175314 },
    title: "Lake View Residence",
    type: "residential",
  },
  {
    position: { lat: 30.007344708483004, lng: 31.540707334929824 },
    title: "Emaar Mivida",
    type: "residential",
  },
  {
    position: { lat: 30.024831912211155, lng: 31.50153637346938 },
    title: "AUC New Cairo",
    type: "education",
  },
];

export interface Hotspot {
  pitch: number;
  yaw: number;
  target: {
    location: string;
  };
}

export interface Location {
  id: string;
  name: string;
  imgName: string;
  hotspots: Hotspot[];
}

export interface Floor {
  [location: string]: Location;
}

export interface Cluster {
  groundFloor?: Floor;
  firstFloor?: Floor;
  secondFloor?: Floor;
  Roof?: Floor;
}

export interface PanoData {
  ClusterA?: Cluster;
  ClusterB?: Cluster;
  ClusterTW?: Cluster;
}