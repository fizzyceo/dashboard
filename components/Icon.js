import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: './worldwide-shipping.png',
    
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null, 
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { customIcon };