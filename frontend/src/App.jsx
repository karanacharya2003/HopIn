import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import LandingPage from './pages/LandingPage';
import PublishPage from './pages/PublishPage';
import Map from './components/Map';
import { Navigate } from 'react-router-dom';
import {useAuthContext} from './context/authContext'
import TripPage from './pages/TripPage';


const App = () => {
  const {authUser} = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar /> 
      <main >
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={authUser? <LandingPage/> : <Login />} />
          <Route path="/signup" element={authUser? <LandingPage/> : <Signup />} />
          <Route path="/search" element={authUser? <SearchPage /> : <Login/>} /> 
          <Route path="/publish" element={authUser? <PublishPage/> : <Login/>} />
          <Route path="/trip/:tripId" element={authUser?<TripPage  />: <Login/>} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
``
