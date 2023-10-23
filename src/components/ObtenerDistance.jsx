/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react"
import '../App.css'
import { orderByDistance } from 'geolib';

const ObtenerDistance = ({ userInput, setUserInput, closestDirection, setClosestDirection , directions, setlocationUser, suggestions, distance, locationUser }) => {
  
  const [display, setDisplay] = useState(false); //Manejo de la visibilidad de las sugerencias de direcciones
  const wrapperRef = useRef(null);
  const apiKey = 'DDlA0KW1ZhZImumGb0U23rdJd4TnhLIC' //API KEY Mapquest

  const dias = ["Domingo", "Lunes", "Martes", "Jueves", "Viernes", "Sabado"]

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
    
  const findClosestDirection = (location) => {
    if (userInput != '') {
      const userCoordinates = location;
      const closest = orderByDistance(userCoordinates, directions);
      const DirectionsDispon = closest.filter((direction) => direction.rol === dias[new Date().getDay()])
      console.log(DirectionsDispon);
      setClosestDirection(DirectionsDispon);
    }

    console.log('No hay direccion para decirte cual es el mas cercano')
  };
  
  const updateDirection = (direction) => {
    setUserInput(direction);
    handleClickDirection(direction);
    setDisplay(false);
  };

  const handleClickDirection = async (direction) => {
    if (userInput !== '') {
      console.log('si hay datos en input', direction);
        console.log('has dado click')
        try {
          const response = await fetch(
            `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${direction}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const location = data.results[0].locations[0];
              const locationCoor = data.results[0].locations[0].displayLatLng;
              console.log(data.results[0].locations[0]);
              setlocationUser(location);
              findClosestDirection(locationCoor)
            }
          } else {
            console.error('Error al encontrar la dirección: ', response.statusText);
          }
        } catch (error) {
          console.error('Error al encontrar la dirección: ', error);
        }
    } else {
      console.log('NO HAY DIRECCIÓN EN EL INPUT');
      setlocationUser(null);
    }
  }

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const clearInput = () => {
    setUserInput('');
    setClosestDirection(null);
    setlocationUser(null);
  };
       
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="auto-container">
      <div ref={wrapperRef} className="flex-container flex-column pos-rel">
        <div className="container-user-location">
          <h1>Encuentra el corralón más cercano</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Ingresa una dirección"
              value={userInput}
              onChange={handleInputChange}
              onClick={() => {setDisplay(!display)}}
            />
            {userInput && (
                <button onClick={clearInput}>x</button>
            )}
          </div>
          {display && (
            <div className="autoContainer">
            {suggestions
                  .map((value, index) => {
                    return (
                      <div
                        onClick={() => updateDirection(value)}
                        className="option"
                        key={index}
                        tabIndex="0"
                      >
                        <span>{value}</span>
                      </div>
                    );
                  })}
            </div>
          )}
          {
            closestDirection && (
              <div className="userlocartion-details">
                <div className="options-corralon">
                  <p><span>Localidad o Colonia:</span> {locationUser.adminArea6}</p>
                </div>

                <div className="options-corralon">
                  <p><span>Municipio:</span> {locationUser.adminArea5}</p>
                </div>

                <div className="options-corralon">
                  <p><span>Codigo Postal:</span> {locationUser.postalCode}</p>
                </div>
              </div>
            )
          }
        </div>
          {closestDirection && (
            <div className="container-corralon-location">
              <div className="header-card-details">
                <h2>Corralón Asignado:</h2>
              </div>
              <div className="options-corralon">
                <p><span>Región: </span> {closestDirection[0].region}</p>
              </div>

              <div className="options-corralon">
                <p><span>Corralón:</span> {closestDirection[0].name}</p>
              </div>

              <div className="options-corralon">
                <p><span>Dirección:</span> {closestDirection[0].location}</p>
              </div>

              <div className="options-corralon">
              <p><span>Contacto:</span> {closestDirection[0].contact}</p>
              </div>

              <div className="options-corralon">
              <p><span>Celular:</span> {closestDirection[0].cellphone}</p>
              </div>
              
              <div className="options-corralon-distance">
              <p>Distancia: {distance} metros</p>
              </div>
            </div>
          )
          }
      </div>  
    </div>
  )
}

export default ObtenerDistance
