import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import PieChart from "./chart/PieChart";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function MapAndStats() {
  const [countryStats, setCountryStats] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (selectedCountry) {
      const options = {
        method: 'GET',
        url: `https://covid-193.p.rapidapi.com/statistics?country=${selectedCountry}`,
        headers: {
          'X-RapidAPI-Key': '0829be0c7fmsha70e32594282bfep1f766fjsnab0d836473e2',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        setCountryStats(response.data.response);
        setIsLoading(false);
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, [selectedCountry]);

  const defaultProps = {
    center: {
      lat: 33.837467593754795,
      lng: 64.86225713787185
    },
    zoom: 4
  };

  const getCountryName = (lat, lng) => {
    const requestOptions = {
      method: 'GET'
    };
    setIsHidden(true);
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=307ce2898ead41db87159393898d2bb3`, requestOptions)
      .then(response => response.json())
      .then(result => setSelectedCountry(result.features[0].properties.country))
      .catch(error => console.log('error', error));
  };


  // for cross btn
  const [isHidden, setIsHidden] = useState(true);
  function handleClick() {
    setIsHidden(false);
  };

  return (
    <div>
      <h3>COVID-19 Statistics for {selectedCountry}</h3>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onClick={(evt) => getCountryName(evt.lat, evt.lng)}
        >
          <AnyReactComponent
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>

      <div className={isHidden ? "stats" : "hidden"} >

        {countryStats.length > 0 ? (
          <div>
            <div className="cross" onClick={handleClick} >X</div>
            <h2>{countryStats[0].country}</h2>
            <p className="two"><h3>Active cases</h3>  {countryStats[0].cases.active}</p>
            <p className="three"><h3>Total cases</h3>  {countryStats[0].cases.total}</p>
            <p className="four"><h3>Recovered Cases</h3>  {countryStats[0].cases.recovered}</p>
            <p className="five"><h3>Total deaths</h3>  {countryStats[0].deaths.total}</p>
            <p className="six"><h3>Last updated</h3>  {countryStats[0].time}</p>
            <div className="chart">
              <PieChart covidData={countryStats[0]} />
            </div>
          </div>
        ) : (
          <p>Select a country on the map to see COVID-19 statistics.</p>
        )}
      </div>
    </div>
  );
}

export default MapAndStats;
