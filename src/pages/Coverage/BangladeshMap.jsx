


import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


// ✅ Custom icon
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const BangladeshMap = ({serviceCenters}) => {
  const position = [23.6850, 90.3563]; // Center of Bangladesh

  return (
    <div className="h-[400px] w-full">
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       {
        serviceCenters.map((center,index)=><Marker
        key={index}
        position={[center.latitude,center.longitude]}
        icon={customIcon}
        >
          <Popup>
            <strong>{center.district}</strong> <br></br>
            {center.covered_area.join(', ')}
          </Popup>

        </Marker>)
       }
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
