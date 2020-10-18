import Leaflet from 'leaflet';

import localMarkerImg from '../images/map-marker.svg';

export const mapIcon = Leaflet.icon({
  iconUrl: localMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});
