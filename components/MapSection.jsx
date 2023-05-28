import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const L = dynamic(() => import('leaflet').then((mod) => mod), { ssr: false });



const MapSection = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Creating map options
      var mapOptions = {
        center: [17.385044, 78.486671],
        zoom: 10
      };

      // Creating a map object
      var map = new L.map('map', mapOptions);

      // Creating a Layer object
      var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

      // Adding layer to the map
      map.addLayer(layer);

      // Creating a marker
      var marker = L.marker([17.385044, 78.486671]);

      // Adding marker to the map
      marker.addTo(map);
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '900px', height: '580px' }}></div>
    </div>
  );
};

export default MapSection;
