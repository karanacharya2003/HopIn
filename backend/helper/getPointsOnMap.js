import axios from 'axios';
import * as turf from '@turf/turf';
import dotenv from 'dotenv';
dotenv.config();

const ORS_API_KEY = process.env.ORS_API_KEY;

export async function getRoute(source, destination, n) {
  try {
    if (!Array.isArray(source) || source.length !== 2 || !Array.isArray(destination) || destination.length !== 2) {
      throw new Error("Invalid coordinates passed to getRoute");
    }

    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      {
        coordinates: [source, destination],
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const route = response.data.features[0].geometry;
    const totalDistance = calculateTotalDistance(route);
    const temppoints = divideRouteIntoEqualPoints(route, n);
    const points = [source, ...temppoints, destination];

    return { points, totalDistance };
  } catch (error) {
    console.error("Error getting route:", error.response?.data || error.message || error);
    throw error;
  }
}

function divideRouteIntoEqualPoints(route, n) {
  const line = turf.lineString(route.coordinates);
  const totalDistance = turf.length(line, { units: 'kilometers' });
  const segmentDistance = totalDistance / (n - 1);

  const points = [];
  for (let i = 0; i < n; i++) {
    const pointAtDistance = turf.along(line, segmentDistance * i, { units: 'kilometers' });
    points.push(pointAtDistance.geometry.coordinates);
  }

  return points;
}

function calculateTotalDistance(route) {
  const line = turf.lineString(route.coordinates);
  return turf.length(line, { units: 'kilometers' });
}
