import { useCallback, useEffect, useMemo, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import dynamic from 'next/dynamic';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const center = [41.353388603037136,2.1699363597976933]
const zoom = 17
const zoneAtopleft = [41.356549,2.167908]
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
function DisplayPosition({containerPosition, map }) {
  const [position, setPosition] = useState(() => map.getCenter())

  console.log(containerPosition);
  useEffect(()=>{
    if(containerPosition.length>0){
      map.setView(containerPosition, zoom)
      const Marker = L.marker(containerPosition).addTo(map)
      Marker.bindPopup("this is the container, further information will be available soon")
    }
  },[containerPosition]);
  const onClick = useCallback(() => {
    map.setView(zoneAbottomright, zoom)
    
    
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p className="my-2">
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button className="bg-palet-green rounded-md px-3 py-1 mx-2" onClick={onClick}>reset</button>
    </p>
  )
}

function ExternalStateExample({showSimulationModel,containerPosition}) {
  const [map, setMap] = useState(null)

  
  const displayMap = useMemo(
    () => (
      <MapContainer
        center={ center}
        style={{ height: '600px' ,width:"700px"}}
        zoom={zoom}
        scrollWheelZoom={true}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker  position={containerPosition.length>0? containerPosition :center} >
          <Popup>
            trying it right now 
          </Popup>
        </Marker>   */}
      </MapContainer>
    ),
    [],
  )

  return (
    <div className={`${showSimulationModel && "-z-10"}`}>
      {map ? <DisplayPosition containerPosition={containerPosition} map={map} /> : null}
      {displayMap}
    </div>
  )
}

export default dynamic(() => Promise.resolve(ExternalStateExample), {
    ssr: false
  })