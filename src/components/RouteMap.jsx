/* eslint-disable react/prop-types */
import { useEffect } from "react";

import L from "leaflet"; // Importa la librería Leaflet para trabajar con mapas interactivos.
import "leaflet-routing-machine"; // Importa la extensión de Leaflet para enrutamiento.
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Importa los estilos CSS para la extensión de enrutamiento.
import { useMap } from "react-leaflet"; // Importa la función useMap de la librería react-leaflet.
import startIcon from "../assets/marker1.jpg"; // Importa el icono de punto de inicio.
import endIcon from "../assets/marker1.jpg";

const RouteMap = ({ locationUser, closestDirection, setDistance }) => {
  const map = useMap(); // Obtiene el objeto de mapa actual utilizando useMap de react-leaflet.

  useEffect(() => {
    if (!map) return; // Si el objeto de mapa aún no está disponible, no hagas nada y sale de la función.
    if (!locationUser) return;
    if (!closestDirection) return;

    // Crea un control de enrutamiento con waypoints (puntos de inicio y destino).
    const routingControl = L.Routing.control({
      waypoints: [
        {
          latLng: L.latLng(locationUser.displayLatLng),
          icon: L.icon({
            iconUrl: startIcon,
            iconSize: [32, 32],
          }),
        },
        {
          latLng: L.latLng(closestDirection[0].latitude, closestDirection[0].longitude),
          icon: L.icon({
            iconUrl: endIcon,
            iconSize: [32, 32], // Tamaño del icono de punto de inicio.
          }),
        },
      ],
      routeWhileDragging: false, // Permite la actualización de la ruta mientras se arrastra.
      language: "es", // Establece el idioma del enrutamiento a español.
      lineOptions: {
        styles: [
          { color: "red", opacity: 0.7, weight: 4 }, // Establece el estilo de la línea de ruta.
        ],
      },
    }).addTo(map); // Agrega el control de enrutamiento al mapa.

    // Se Define un manejador de eventos para cuando se encuentren rutas.
    routingControl.on("routesfound", (e) => {
      const routes = e.routes;
      console.log(routes);
      if (routes.length > 0) {
        const route = routes[0];
        const { totalDistance, totalTime } = route.summary;
        console.log(`Distancia: ${totalDistance} metros`);
        console.log(`Tiempo estimado: ${totalTime} segundos`);
        setDistance(totalDistance);
      }
    });

    // Define una función de limpieza para eliminar el control de enrutamiento cuando el componente se desmonta.
    return () => map.removeControl(routingControl);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, locationUser, closestDirection]);

  return null;
};

export default RouteMap;
