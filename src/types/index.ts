import type { LatLngExpression } from 'leaflet';

export type Destination = {
  id: string;
  name: string;
  shortName: string;
  image: string;
  /** Base filename (without extension) for optimized images */
  imageName: string;
  tags: string[];
  center: LatLngExpression;
  zoom: number;
  features: string[];
};
