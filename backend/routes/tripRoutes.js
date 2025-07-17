import express from "express"
import createTrip from "../controllers/trip/createTrip.js";
import findTrip from "../controllers/trip/findTrips.js";
import { joinRide } from "../controllers/trip/joinRide.js";
import validateUser from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/create",validateUser,createTrip);  
router.post("/find",validateUser,findTrip);
router.post("/join", validateUser, joinRide);

//TODO
// check if the user is logged in

export default router;