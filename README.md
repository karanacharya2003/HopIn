# Ride Sharing Platform 🚗🌎

Welcome to my Ride Sharing Platform repository! This project is a comprehensive solution for facilitating ride-sharing among users with a focus on scalability, real-time notifications, security, and ease of use. The platform allows users to connect, share rides, track their journey, and provide feedback – all managed through a well-organized and user-friendly interface.

**The algorithm behind the working of the application is developed soleley by me, have a look at it in the core methodology section and please feel free to provide any suggestion on how can I improve it!**

---

## Features 🛠️

### User Roles
- **Traveler**: Can publish new rides with the desired fare.
- **Traveler Companion**: Can accompany a Traveler in a shared ride by searching for his source and destination.
- **Admin**: Manages the platform, including rides, users, and feedback.

### Core Functionalities
- **Ride Sharing via WhatsApp/SMS**: Users can share ride details with others through WhatsApp or SMS.
- **Real-time Location Tracking**: Leveraging the Mapbox API, users can track rides in real-time.
- **Geofencing-based Notifications**: Receive alerts when users enter or leave predefined geofenced areas.
- **Secure Authentication**: JWT-based authentication for secure user sessions.
- **Feedback Mechanism**: Users can provide feedback on rides, enhancing the platform's quality.
  
### Core Methodology (MUST READ)

![Description of image](Diagram.png)

The platform leverages a geolocation-based algorithm to match travelers with companions even if they do not have identical starting points or destinations. Below is a detailed breakdown of how this functionality is implemented:

1. **Ride Publication and Geolocation Conversion**:
   - When a **Traveler** publishes a ride, the system converts the given source and destination locations into their respective geographic coordinates (latitude and longitude) using the **Mapbox API**.
   - This transformation allows for precise route mapping and facilitates accurate distance calculations required for complex ride-matching criteria.

2. **Flexible Ride-Matching with Waypoints**:
   - In real-world scenarios, a Traveler’s route from origin to destination may align with multiple potential companions’ routes, even if the exact locations differ. For instance, a Traveler driving from **Delhi to Chandigarh** can potentially share a ride with a **Companion** traveling from **Kurukshetra to Ambala** as these routes overlap partially.
   - To support this flexibility, the platform computes not only the geographic coordinates of the origin and destination but also a series of intermediate points or **waypoints** along the Traveler's route. These waypoints represent key positions between the source and destination and are spaced based on predefined distance intervals to ensure sufficient granularity in ride-matching.

3. **Companion Ride Search and Geofencing**:
   - When a Companion searches for available rides, the system first calculates the coordinates for the Companion's source and destination.
   - The system then identifies any **published rides** with waypoints that fit within a geofence around the Companion’s starting and ending locations. This ensures the ride path aligns with the Companion’s intended route.
   - Specifically, the platform checks if the **waypoints within the geofence** are ordered such that the index of the waypoint nearest to the Companion's source is less than that of the waypoint nearest to the Companion's destination. This ordering confirms that the Traveler’s route aligns directionally with the Companion’s path, ensuring both are moving in the same general direction.

4. **Geofencing Criteria**:
   - Geofences are defined as proximity boundaries around specific geographic points, allowing the system to calculate which waypoints fall within a reasonable distance of the Companion’s start and end locations.
   - This feature uses **Mapbox’s location services** to dynamically calculate if a waypoint is within a defined geofenced area around the source and destination points, offering accuracy and efficiency in ride-matching.

5. **Ensuring Directional Alignment**:
   - The platform checks the indices of the waypoints within the Companion’s geofenced area. If the **source waypoint index** is less than the **destination waypoint index**, it confirms the Companion's desired route aligns with the Traveler’s direction. This criterion prevents mismatches where routes may intersect but lead in different directions.

This methodology provides a robust and flexible solution, enabling partial route-sharing and dynamic ride-matching based on both geographic and directional compatibility.
---

## Tech Stack ⚙️

### Frontend
- **React**: For building responsive and interactive UI.
- **Mapbox API**: Utilized for map rendering, geolocation, navigation, and route visualization.
  
### Backend
- **Node.js & Express**: Efficient and scalable server-side application development.
- **Java (Spring)**: Used for developing some backend services to enhance robustness.
- **MongoDB**: For storing ride and user-related data, allowing scalability and flexibility in data management.

### Notifications
- **Twilio API**: Integrated to send notifications to users on WhatsApp or via SMS, ensuring real-time alerts and updates.

### Additional Libraries
- **JWT**: Secure session management for user authentication.
- **Mongoose**: ODM library for MongoDB to manage database interactions smoothly.
- **Axios**: For handling API requests in the frontend.
- **Mapbox GL**: Enables high-quality map rendering and customization.

---

## Setup and Installation 🚀

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mapbox API Key](https://www.mapbox.com/)
- [Twilio API Key](https://www.twilio.com/)

### Installation
1. **Clone the repository**:
   ```bash
   git clone "thisrepo.git"
   cd Ride-Sharing-Platform
   ```
2. **Install Backend Dependencies**:
   ```bash
   npm install
   ```
3. **Install Frontend Dependencies**:
   ```bash
   cd .\frontend\
   npm install
   ```
4. Environment Variables: Create a .env file in both root and frontend directories with the following keys (root for backend):
   
   **root `.env`**:
   ```env
   PORT=8000
   DATABASE_URL=mongodb+srv://karan:**********@cluster0.rv37j5m.mongodb.net/
   JWT_SECRET=pLhx2g*************5Ri+Mq2hSA/rZl6ZY=
   MAIL=vir****@gmail.com
   MAIL_PASS=i********jsb 
   SID = ACbe7***********ddde88a0e
   AUTH_TOKEN = bcd************5876efc1b56
   PHONE_NUM = +1******249
    
   MAPBOX_ACCESS_TOCKEN=pk.eyJ1Ij*****************n0.UD4_b876WDvl1AP8Sium5g
   NODE_ENV=development
   ```
   **frontend `.env`**:
   ```env
   VITE_GEO_API_KEY=9a************3aef5
   VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1*********************d3NrMnk1ZDEzIn0.UD4_b876WDvl1AP8Sium5g
   ```
6. **Run the Application**:
   * **Backend**:
     ```bash
     node backend/server.js
     ```
   * **Frontend**:
     ```bash
     cd .\frontend\
     npm run dev
     ```
   

