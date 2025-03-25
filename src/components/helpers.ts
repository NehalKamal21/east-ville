export const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};


export const eastVilleLocation: google.maps.LatLngLiteral = {
  lat: 30.04620586690839,
  lng: 31.572817028510652,
};

export const polygonCoordinates: google.maps.LatLngLiteral[] = [
  { lat: 30.04645, lng: 31.57102 },
  { lat: 30.04618, lng: 31.57436 },
  { lat: 30.04294, lng: 31.57501 },
  { lat: 30.03946, lng: 31.57583 },
  { lat: 30.03952, lng: 31.5737 },
  { lat: 30.0395, lng: 31.57049 },
  { lat: 30.04289, lng: 31.57105 },
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
