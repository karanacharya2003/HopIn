import express from "express";
import { getDistance } from "../controllers/cab_geofence/getDistance.js";
import validateUser from "../middlewares/validateUser.js";
const router = express.Router();


router.post("/getLocation", validateUser , getDistance )

//TODO
// check if the user is logged in

export default router;