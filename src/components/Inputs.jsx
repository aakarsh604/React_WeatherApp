import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from 'react-toastify';

const Inputs = ({setQuery, setUnits, units}) => {

  const [city, setCity] = useState("");

  const handleSearchClick = () => {
      if( city ) setQuery({q : city})
  }

  const handleLocationClick = () => {
      if(navigator.geolocation) {

        // toast.info("Fetching users location.")
        navigator.geolocation.getCurrentPosition(position => {

          // toast.success("Location fetched!")
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          setQuery({
            lat, lon
          })
        })
      }
  }

  const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name;
        if( units !== selectedUnit ) setUnits(selectedUnit);
  }

  return (
    <div className="flex flex-row jsutify-center my-6">
      <div className="flex flex-row justify-center w-3/4 items-center space-x-4">
        <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
          placeholder="search for city..."
          type="text"
          className="text-xl font-normal p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <UilSearch
         onClick={handleSearchClick}
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
        <UilLocationPoint
        onClick={handleLocationClick}
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
        onClick={handleUnitsChange}
          name="metric"
          className="text-xl font-light text-white transition ease-out hover:scale-125"
        >
          °C
        </button>
        <p className="text-white text-xl mx-1">|</p>
        <button
        onClick={handleUnitsChange}
          name="imperial"
          className="text-xl font-light text-white transition ease-out hover:scale-125"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
