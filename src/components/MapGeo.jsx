/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RouteMap from "./RouteMap";
import municipios from "../assets/Municipios";
// import { useState } from "react";


const MapGeo = ({locationUser, closestDirection, setDistance}) => { 

  const PositionPuebla = [19.0431, -98.1980]; //latitud y longitud del Estado de Puebla

  return (
    <>
      <div className="map-container">
        <MapContainer center={PositionPuebla} zoom={13} style={{ height: '100vh', width: '100%' }} >
          <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON data={municipios}
           onEachFeature={(feature, layer) => {
            layer.bindPopup(feature.properties.NAME_2);
          }}
          />
          {locationUser && (
            <RouteMap
              locationUser={locationUser}
              closestDirection={closestDirection}
              setDistance={setDistance}
            />
          )}
        </MapContainer>
      </div>
    </>
  )
}

export default MapGeo
