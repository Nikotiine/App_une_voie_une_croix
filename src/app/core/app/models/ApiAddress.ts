export interface ApiAddress {
  type: string;
  version: string;
  attribution: string;
  limit: number;
  licence: string;
  feature: feature[];
}
export interface feature {
  type: string;
  properties: properties;
}

export interface properties {
  city: string;
  citycode: string;
  context: string;
  distance: number;
  housenumber: string;
  id: string;
  importance: number;
  label: string;
  name: string;
  postcode: string;
  score: number;
  street: string;
  type: string;
  x: number;
  y: number;
}
