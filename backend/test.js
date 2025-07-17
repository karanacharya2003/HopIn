import { getRoute } from "./helper/getPointsOnMap.js";
import {checkIfPointInGeofence} from "./helper/getNearestLocation.js"


const source = [77.07337644308073, 29.02576043064647];
const destination = [77.20903405371924, 28.610950319628742]
const numberOfPoints = 10

const routePoints = await getRoute(source, destination, numberOfPoints);
console.log("ROUTE POINTS ", routePoints);

const totalDistance = routePoints.totalDistance;
const radius = totalDistance/numberOfPoints;
const targetSourceLocation = [77.14408994194763,28.79862655943395]
const targetDestinationLocation = [77.16042937112621,28.729016844897554]


// 28.729016844897554, 77.16042937112621

console.log("RADIUS",radius)


const startGeofenceLocation = checkIfPointInGeofence(routePoints.points, radius, targetSourceLocation);
let destinationGeofenceLocation = null;
if(startGeofenceLocation.inside){
    destinationGeofenceLocation = checkIfPointInGeofence(routePoints.points, radius, targetDestinationLocation)
    if(destinationGeofenceLocation.inside){
        //trip permitted

        const startIndex = startGeofenceLocation.index;
        const endIndex = destinationGeofenceLocation.index;
        console.log("INDEX",[startIndex,endIndex]);


        if(startIndex<endIndex){
            console.log("TRIP PERMITTED")
        }


    }else{
        //no destination found
    }
}else{
    //NO SOURCE EXIST
}
