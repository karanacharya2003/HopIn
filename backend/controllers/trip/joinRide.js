import Trip from "../../models/trip.js";

export const joinRide = async (req,res) => {
    try {

        const {tripId , targetPoint} = req.body;

        const name = req.user.fullName;


        const trip = await Trip.findById(tripId);
        // if(trip.status !== "active"){
        //     res.status(400).json({message : "ride is unactive"});
        //     return
        // }

        if(trip.available_seats === trip.companions.length){
            res.status(400).json({message : "no seats available"});
            return
        }
        trip.companions.push({
            name,
            targetPoint
        });
        await trip.save();
        // console.log("successssssssss");

        res.status(200).json({message : "success"})
    
        
    } catch (error) {
        console.log("Error in join ride controller", error);
        res.status(500).json({message : "failed"});
    }
}

