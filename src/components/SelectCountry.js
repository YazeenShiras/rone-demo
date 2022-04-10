import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";

function SelectCountry() {
  const [country, setCountry] = useState("");
  const [allStates, setstates] = useState("");
  const Countries = Country.getAllCountries().map((country) => {
    return (
      <option key={country.isoCode} value={country.isoCode}>
        {country.name}
      </option>
    );
  });

  const handleCountry = (e) => {
    setCountry(e.target.value);
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

  return (
    <>
      <div className="max-w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center">
        <div class="flex flex-col justify-center">
          <div class="mb-3 xl:w-96">
            <select
              className="m-0 form-select appearance-none block w-full px-3  py-1.5  font-normal  text-base  text-gray-700   bg-white bg-clip-padding bg-no-repeat   border border-solid border-gray-300 rounded  transition   ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              onClick={handleCountry}
            >
              <option selected>Open this select your country</option>
              {Countries}
            </select>
          </div>
          <div class="mb-3 xl:w-96">
            <select
              className="m-0 form-select appearance-none block w-full px-3  py-1.5  font-normal  text-base  text-gray-700   bg-white bg-clip-padding bg-no-repeat   border border-solid border-gray-300 rounded  transition   ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              onClick={handleCountry}
            >
              <option selected>Open this select state</option>
              {States ? (
                States
              ) : (
                <option value="" selected>
                  Select State
                </option>
              )}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectCountry;
