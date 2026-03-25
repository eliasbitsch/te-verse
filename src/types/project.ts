export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  thumbnail: string;
  tags: string[];
  color: string;
}

export interface Station {
  id: string;
  name: string;
  description: string;
  url: string;
  position: [number, number, number];
  tags: string[];
  color: string;
}

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  geo: GeoCoordinate;
  mapPosition: [number, number, number]; // computed from geo
  stations: Station[];
}
