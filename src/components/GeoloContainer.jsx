import { useState, useEffect } from 'react';
import '../App.css'
import MapGeo from './MapGeo'
import ObtenerDistance from './ObtenerDistance'
// import { orderByDistance } from 'geolib';

const directions = [
    { region: 1, rol: 'Martes', name: 'Catedral de puebla', location: 'Calle 16 de Septiembre s/n, Centro histórico de Puebla, 72000 Puebla, Pue' , latitude: 19.0428904, longitude: -98.1983291, contact: 'Sr. Mario Zespedez', cellphone: '2221245671' },
    { region: 1, rol: 'Lunes', name: 'UTP', location: 'Antiguo Camino a La Resurrección 1002 - A, Zona Industrial, 72300 Puebla, Pue', latitude: 19.0583868, longitude: -98.1565643, contact: 'Sr. Jose Rivas', cellphone: '2221245684' },
    { region: 2, rol: 'Martes', name: 'Fuerte de Loreto', location: 'Aparcamiento, Av Ejercito de Ote 100, Zona de Los Fuertes, 72260 Puebla, Pue', latitude: 19.0568389, longitude: -98.1897296, contact: 'Sr. Pedro Martinez', cellphone: '2221245608' },
    { region: 2, rol: 'Lunes', name: 'Escuela Benito Juarez', location: 'Calle Francisco I. Madero 33, Zona Sin Asignación de Nombre de Col 1, San Pablo Xochimehuacan, 72014 Puebla, Pue', latitude: 19.0921398, longitude: -98.2034687, contact: 'Sr.Daniel Flores', cellphone: '2221245656' },
    { region: 3, rol: 'Martes', name: 'Ibero', location: 'Reserva Territorial Atlixcáyotl, Centro Comercial Puebla, 72834 Puebla, Pue.', latitude: 19.0304348, longitude: -98.2425489, contact: 'Sr. Angel Solis', cellphone: '2221245612' },
  ];
    
const GeoloContainer = () => {
    const [userInput, setUserInput] = useState(''); //Contenido de la caja de texto
    const [closestDirection, setClosestDirection] = useState(null); //Direccion mas cercana al punto de referencia
    const [suggestions, setSuggestions] = useState([]); //Arreglo de Sugerencias de direcciones
    const [locationUser, setlocationUser] = useState(null); //ubicacion  del usuario
    const [distance, setDistance] = useState(null);//distancia inicio-destino
    const apiKey = 'DDlA0KW1ZhZImumGb0U23rdJd4TnhLIC' //API KEY Mapquest
     
    useEffect(() => {
        if (userInput.length > 3 ) {
          fetch(
            `http://www.mapquestapi.com/search/v3/prediction?limit=5&collection=adminArea,poi,address&key=${apiKey}&q=${userInput}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                const suggestions = data.results.map((location) => location.displayString);
                setSuggestions(suggestions);
              }
            })
            .catch((error) => {
              console.error('Error al buscar sugerencias de direcciones:', error);
            });
        } else {
          setSuggestions([]);
        }
      }, [userInput, apiKey]);
  
  return (
    <div className="main-container">
      <MapGeo
        locationUser={locationUser}
        closestDirection={closestDirection}
        setDistance={setDistance}
          />
      <ObtenerDistance
        userInput={userInput}
        setUserInput={setUserInput}
        closestDirection={closestDirection}
        setClosestDirection={setClosestDirection}
        setlocationUser={setlocationUser}
        suggestions={suggestions}
        directions={directions}
        distance={distance}
        locationUser={locationUser}
          />
    </div>
  )
}

export default GeoloContainer
