import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility';
import LocationMarker from './LocationMarker';
const Map = ({ longitude, latitude }) => {

  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers,setMarkers] = useState([]);
  const [position,setPosition] = useState({lat:41.353388603037136,lng:2.1699363597976933})
  const [topleft,setTopLeft] = useState([41.356549, 2.167908])
  const [mapKey, setMapKey] = useState(0);
  useEffect(() => {
    setMapLoaded(true);
    setMarkers(markers=>[...markers,{
      position:topright,
      infos:"testing popups with"
    },{
      position:topleft,
      infos:"testing popups with"
    },{
      position:bottomright,
      infos:"testing popups with"
    },{
      position:zoneBbottomright,
      infos:"testing popups with"
    },{
      position:zoneBbottomleft,
      infos:"testing popups with"
    },{
      position:zoneAbottomleft,
      infos:"testing popups with"
    }
  ]);
  },[]);


  const topright = [41.355253, 2.171459]
  
  
  const bottomleft= [41.352876, 2.165557]
  const bottomright=[41.351588, 2.169108]
  
  const zoneAtopleft = {
    lat:41.356549,
    lng: 2.167908
  }
  const zoneAtopright = [41.355253, 2.171459]
  
  const zoneAbottomleft = [41.355682, 2.167316]
  const zoneAbottomright = [41.354385, 2.170813]
  const zoneBtopleft = zoneAbottomleft
  const zoneBtopright = zoneAbottomright
  const zoneBbottomleft = [41.353846, 2.166103]
  const zoneBbottomright = [41.352485, 2.169708]
  
  const zoneCtopleft = zoneBbottomleft
  const zoneCtopright = zoneBbottomright
  const zoneCbottomleft = [41.353830, 2.166114]
  const zoneCbottomright = [41.352501, 2.169655]


 
  const testRequest = async () => {
    const response = await fetch('../api/sentToServer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        container_id: '045045---- 145',
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  const AddMarker=()=>{
    const updatedPosition = [...topleft];

     markers.push({
      position:zoneCtopleft,
      infos:"testinggggg Zone C with"
    })
    setPosition({
      lat : zoneAtopleft.lat,

     lng:zoneAtopleft.lng
    })
    // setMapKey((prevKey) => prevKey + 1);
    

    console.log(position);
  }
  return (
    <>
        < button className='bg-black p-4 text-white' onClick={AddMarker}>Test</button>
        {mapLoaded && (
        <MapContainer   key={mapKey} center={{lat:position.lat,lng:position.lng}} zoom={17} scrollWheelZoom={true} style={{ height: '600px' }}>
        
          <>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.length > 0 && markers.map((marker,index) =>(
          <Marker key={index} position={marker.position} >
          <Popup>
            {marker.infos}
          </Popup>
        </Marker>  
          ))}
          <LocationMarker/>
          </>
        </MapContainer>
          )}

</>
    
  );
};

export default dynamic(() => Promise.resolve(Map), {
  ssr: false
})