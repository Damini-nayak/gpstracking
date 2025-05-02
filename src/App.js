import { useState } from 'react';
import './App.css';

function App() {

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [userAddress, setUserAddress] = useState();

  const geo = navigator.geolocation;
  geo.getCurrentPosition(userCoords)

  function userCoords(position){
    let userLatitude = position.coords.latitude;
    let userLongitude = position.coords.longitude;

    setLatitude(userLatitude)
    setLongitude(userLongitude)

  } 

  const getLiveLocation = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=33c9dfa7e821433ba3cfb9944a059190&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
    const loc = await fetch(url);
    const data = await loc.json();
    console.log("address :", data);
    
    setUserAddress(data.results[0].formatted)
    }
    
  const handleUserAddress = () => {
    getLiveLocation()
  }

  return (
    <>
    <div>
      <h2>current location</h2>
      <h6>Latitude : {latitude}</h6>
      <h6>Longitude :{longitude}</h6>
      <h4>Address : {userAddress}</h4>
      <button onClick={handleUserAddress}>get Address</button>
    </div>
    </>
  );
}

export default App;
