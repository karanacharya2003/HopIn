import Trip from "../../models/trip.js";
import User from "../../models/user.js";
import { manager } from "../notification/manager.js";
import * as turf from "@turf/turf";

export const getDistance = async (req, res) => {
  try {
    const { point, tripId, radius = 0.5 } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(400).json({ message: "Invalid trip ID" });
    }

    const companions = trip.companions || [];
    for (const companion of companions) {
      const targetPoint = companion.targetPoint;
      const geofence = turf.circle(point, radius, { units: "kilometers" });
      const isInside = turf.booleanPointInPolygon(targetPoint, geofence);

      if (isInside) {
        const user = await User.findById(companion.userId);
        const phone = "+91" + process.env.PHONE_NUMBER;
        manager(phone, "Cab is near, be ready!");
      }
    }

    res.status(200).json({ message: "success", tripStatus: trip.ride_status });
  } catch (error) {
    console.error("error in get distance controller", error);
    res.status(500).json({ message: "failed" });
  }
};
