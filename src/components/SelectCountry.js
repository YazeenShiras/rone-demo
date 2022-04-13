import React, { useState, useEffect } from 'react'
import { Country, State, City } from 'country-state-city';

function SelectCountry() {
  const [allStates, setstates] = useState("")
  const [city, setCity] = useState("")

  const [country, setCountry] = useState("")

  useEffect(() => {
    console.log(country);
  }, [country])

  const Countries = Country.getAllCountries().map((country) => {
    return <option key={country.isoCode} id={country.isoCode} value={country.isoCode}>{country.name}</option>
  })

  const handleCountry = (e) => {
    setCountry(e.target.value)
    const States = State.getAllStates().filter((state) => {
      return state.countryCode === e.target.value
    })
    setstates(States)
  }

  let States;
  if (allStates) {
    States = allStates.map((state) => {
      return <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
    })
  }

  const handlestate = (e) => {
    const city = City.getAllCities().filter((city) => {
      return city.stateCode === e.target.value
    })
     setCity(city)
  }


  let cities;
  if (city) {
    cities = city.map((city) => {
      return <option key={city.id} value={city.name}>{city.name}</option>
    })
  }

  const handlecity = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
      <div className='max-w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center'>
        <div className="flex flex-col justify-center">
          <div className="mb-3 xl:w-96">
            <select className="m-0 form-select appearance-none block w-full px-3  py-1.5  font-normal  text-base  text-gray-700   bg-white bg-clip-padding bg-no-repeat   border border-solid border-gray-300 rounded  transition   ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onClick={handleCountry}>
             <option id="select" value="country"> Select Country</option>
              {Countries}
            </select>
          </div>
          <div className="mb-3 xl:w-96">
            <select className="m-0 form-select appearance-none block w-full px-3  py-1.5  font-normal  text-base  text-gray-700   bg-white bg-clip-padding bg-no-repeat   border border-solid border-gray-300 rounded  transition   ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onClick={handlestate}>
              <option value="">Select State</option>
              {States ? States : ""}
            </select>
          </div>
          <div className="mb-3 xl:w-96">
            <select className="m-0 form-select appearance-none block w-full px-3  py-1.5  font-normal  text-base  text-gray-700   bg-white bg-clip-padding bg-no-repeat   border border-solid border-gray-300 rounded  transition   ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onClick={handlecity}>
              <option value="">Select City</option>
              {cities ? cities : ""}
            </select>
          </div>
        </div>

      </div>

    </>
  )
}

export default SelectCountry