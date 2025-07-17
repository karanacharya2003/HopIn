import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  source: {
    type: [Number],
    required: true,
    validate: {
      validator: arr => Array.isArray(arr) && arr.length === 2,
      message: "Source must be [lng, lat]",
    }
  },
  destination: {
    type: [Number],
    required: true,
    validate: {
      validator: arr => Array.isArray(arr) && arr.length === 2,
      message: "Destination must be [lng, lat]",
    }
  },
  waypoints: {
    type: Array,
    default: []
  },
  companions: {
    type: Array,
    default: []
  },
  available_seats: {
    type: Number,
    required: true
  },
  ride_creator: {
    type: String,
    required: true
  },
  cab_number: {
    type: String,
    required: true
  },
  driver_name: {
    type: String,
    required: true
  },
  driver_phone: {
    type: String
  },
  ride_status: {
    type: String,
    enum: ["active", "unactive", "completed"],
    default: "active"
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
