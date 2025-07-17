
import {getValidTrips} from "../../helper/getValidTrips.js";
import Trip from "../../models/trip.js";

const findTrip = async (req, res) => {
  try {
    const source = req.body.source;
    const destination = req.body.destination;

    console.log("📥 Received source & destination:", { source, destination });

    const documents = await Trip.find({});
    console.log("📦 Trips in DB:", documents.length);

    const matchedTrips = [];

    for (const trip of documents) {
      const isValid = await getValidTrips(trip, source, destination);
      if (isValid) {
        matchedTrips.push(trip);
      }
    }

    console.log("🎉 Matched trips count:", matchedTrips.length);
    res.status(200).json(matchedTrips);
  } catch (error) {
    console.error("Error in find trips:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default findTrip;