import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

function SelectCountry() {
  const [country, setCountry] = useState("");
  const [allStates, setstates] = useState("");
  const [city, setCity] = useState("");

  const CountriesData = Country.getAllCountries().map((country) => {
    return (
      <option key={country.isoCode} value={country.name}>
        {country.name}
      </option>
    );
  });

  const textClick = () => {
    console.log(CountriesData);
  };

  const getCountry = (e) => {
    setCountry(e.target.value);
    console.log(country);
  };

  useEffect(() => {
    const States = State.getAllStates().filter((state) => {
      return state.countryCode === country;
    });
    setstates(States);
  }, [country]);

  let States;
  if (allStates) {
    States = allStates.map((state) => {
      return (
        <option key={state.isoCode} value={state.isoCode}>
          {state.name}
        </option>
      );
    });
  }

  const handlestate = (e) => {
    const city = City.getAllCities().filter((city) => {
      return city.stateCode === e.target.value;
    });
    setCity(city);
  };

  let cities;
  if (city) {
    cities = city.map((city) => {
      return (
        <option key={city.id} value={city.name}>
          {city.name}
        </option>
      );
    });
  }

  const handlecity = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className="max-w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center">
          <div className="mb-3 xl:w-96">
            <select onClick={getCountry} aria-label="Default select example">
              {CountriesData}
            </select>
          </div>
          <div className="mb-3 xl:w-96">
            <select
              className="m-0 form-select appearance-none block w-full px-3  py-1.5  font-normal  text-base  text-gray-700   bg-white bg-clip-padding bg-no-repeat   border border-solid border-gray-300 rounded  transition   ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              onClick={handlestate}
            >
              <option selected>Open this select state</option>
              {States ? States : ""}
            </select>
          </div>
          <div className="mb-3 xl:w-96">
            <select
              className="m-0 form-select appearance-none block w-full px-3  py-1.5  font-normal  text-base  text-gray-700   bg-white bg-clip-padding bg-no-repeat   border border-solid border-gray-300 rounded  transition   ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              onClick={handlecity}
            >
              <option selected>Open this select city</option>
              {cities ? cities : ""}
            </select>
          </div>
        </div>
      </div>
      <button onClick={textClick}></button>
    </>
  );
}

export default SelectCountry;
