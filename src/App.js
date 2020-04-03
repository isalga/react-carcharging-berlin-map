import './App.css';
import React from "react";
import { useRequestCarChargingPoints } from './api/hooks';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { MAPBOX_TOKEN } from './config';

const App = () => {
  const [{carChargingPoints, loading, error }] = useRequestCarChargingPoints();
  const Map = ReactMapboxGl({ accessToken: MAPBOX_TOKEN });

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>Error while getting cars charging points list</p>
  }

  return (
    <div>
      <h1>Car Charging points in Berlin</h1>
      <div className='react-map-gl-customcontainer'>
        <Map
          center={[13.404954,52.520008]}
          style="mapbox://styles/mapbox/streets-v8"
          zoom={[10]}
          containerStyle={{
            height: "100%",
            width: "500px"
          }}>
          {carChargingPoints && carChargingPoints.map((point) => {
            return (
              <Marker
                coordinates={[point.AddressInfo.Longitude, point.AddressInfo.Latitude]}
                anchor="bottom">
                <img src={'/map-marker.png'} width={25} height={25}/>
              </Marker>
            )
            })}
        </Map>
      </div>
    </div>
  );
}

export default App;