import checkIfPointInGeofence from "./getNearestLocation.js";
import { getRoute } from "./getPointsOnMap.js";

// Helper: Validate [lng, lat] format
function isValidCoordinate(coord) {
  return (
    Array.isArray(coord) &&
    coord.length === 2 &&
    typeof coord[0] === 'number' &&
    typeof coord[1] === 'number' &&
    coord[0] >= -180 && coord[0] <= 180 &&
    coord[1] >= -90 && coord[1] <= 90
  );
}
export const getValidTrips = async (trip, source, destination) => {
  const numberOfPoints = 20;

  console.log("🔍 Evaluating trip:");
  console.log("Trip Source:", trip.source);
  console.log("Trip Destination:", trip.destination);
  console.log("User Source:", source);
  console.log("User Destination:", destination);

  if (
    !isValidCoordinate(trip.source) ||
    !isValidCoordinate(trip.destination) ||
    !isValidCoordinate(source) ||
    !isValidCoordinate(destination)
  ) {
    console.warn("❌ Skipping invalid trip or user coordinates");
    return false;
  }

  if (trip.ride_status !== "active" || trip.available_seats <= 0) {
    console.log("⛔ Trip skipped: status not active or no seats");
    return false;
  }

  let routePoints;
  try {
    routePoints = await getRoute(trip.source, trip.destination, numberOfPoints);
    console.log("🛣️ Route Points received:", routePoints.points.length);
  } catch (err) {
    console.error("❌ Error in getRoute:", err.message);
    return false;
  }

  if (!routePoints || !routePoints.points || !Array.isArray(routePoints.points)) {
    console.warn("⚠️ Route points missing");
    return false;
  }

  const { points, totalDistance } = routePoints;
  const radius = 2 * (totalDistance / numberOfPoints);
  console.log("📏 Geofence radius:", radius);

  const startGeofenceLocation = checkIfPointInGeofence(points, radius, source, 0);
  console.log("🎯 Source Inside Geofence:", startGeofenceLocation);

  if (!startGeofenceLocation.inside) {
    console.log("⛔ Source not in geofence");
    return false;
  }

  const destinationGeofenceLocation = checkIfPointInGeofence(points, radius, destination, 1);
  console.log("🎯 Destination Inside Geofence:", destinationGeofenceLocation);

  if (!destinationGeofenceLocation.inside) {
    console.log("⛔ Destination not in geofence");
    return false;
  }

  if (startGeofenceLocation.index < destinationGeofenceLocation.index) {
    console.log("✅ Trip matched!");
    return true;
  } else {
    console.log("⛔ Invalid order of source and destination");
    return false;
  }
};
