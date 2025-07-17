import React, { useEffect, useRef, useState } from 'react';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { tripState } from '../atoms/TripContext';
import { useRecoilValue } from 'recoil';

maplibregl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; // Use env variable for Mapbox token

const Map = ({src,des}) => {
  const mapContainer = useRef(null); // Container for map
  const map = useRef(null); // Reference to the map object
  const trip = useRecoilValue(tripState);
  
  const [source,setSource] = useState(trip.source); 
  const [destination,setDestination] =useState(trip.destination); // Bangalore coordinates

  useEffect(() => {
    if (map.current) return; // Prevent map from being initialized multiple times

    // Initialize Mapbox map
     map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Free style
      center: source,
      zoom: 5,
    });

    // Add zoom and rotation controls
    map.current.addControl(new maplibregl.NavigationControl());

    // Fit map to bounds of source and destination
    map.current.fitBounds([source, destination], {
      padding: { top: 50, bottom: 50, left: 50, right: 50 }, // Add padding
      maxZoom: 14, // Maximum zoom level when fitting bounds
    });

    // Add source marker (Mumbai)
    new maplibregl.Marker({ color: 'green' })
      .setLngLat(source)
      .addTo(map.current);

    // Add destination marker (Bangalore)
    new maplibregl.Marker({ color: 'red' })
      .setLngLat(destination)
      .addTo(map.current);

    // Fetch and draw the route between source and destination
    map.current.on('load', async () => {
      const { points } = await getRoute(source, destination, 10);
      const route = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: points,
        },
      };

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: route,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
        },
      });
    });
  }, []);

  return (
    <div className='relative overflow-hidden w-full h-[90vh]'>
      <div ref={mapContainer} className='h-full w-full' />
    </div>
  );
};

export default Map;