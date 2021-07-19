interface Earthquake {
  type: string;
  id: string;
  geometry: {
    coordinates: number[];
    type: string;
  };
  properties: {
    time: number;
    place: string;
    mag: number;
    magType: string;
    title: string;
  };
}

interface Country {
  type: string;
  properties: {
    ADMIN: string;
    ISO_A3: string;
  };
  geometry: {
    type: string;
  };
}

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

export type { Earthquake, Country, Viewport };
