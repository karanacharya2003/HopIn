import Trip from "../../models/trip.js";

const createTrip = async (req, res) => {
  try {
    const {
      fullName,
      cab_number,
      driver_phone,
      driver_name,
      source,
      destination,
      price,
      available_seats
    } = req.body;

    console.log("Create Trip payload:", req.body); // helpful debug

    if (
      !fullName ||
      !cab_number ||
      !driver_name ||
      !driver_phone ||
      !Array.isArray(source) || source.length !== 2 ||
      !Array.isArray(destination) || destination.length !== 2 ||
      !price ||
      !available_seats
    ) {
      return res.status(400).json({
        message: "Missing or invalid fields in create trip",
      });
    }

    const newTrip = new Trip({
      ride_creator: fullName,
      driver_name,
      driver_phone,
      cab_number,
      source,
      destination,
      price,
      available_seats
    });

    await newTrip.save();

    res.status(200).json(newTrip);
  } catch (error) {
    console.log("Error in create Trip:", error);
    res.status(500).json({
      message: "Ride creation failed. Internal server error.",
    });
  }
};

export default createTrip;
