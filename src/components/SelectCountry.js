import React, {useEffect, useState } from 'react'
import { Country, State, City } from 'country-state-city';

function SelectCountry() {
  const [allStates, setstates] = useState("")
  const [city, setCity] = useState("")

  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [citi, setCiti] = useState("")

  useEffect(() => {
    console.log(country);
    console.log(state);
    console.log(citi);
  }, [country, state, citi])

  const Countries = Country.getAllCountries().map((country) => {
    return <option key={country.isoCode} value={[country.isoCode,country.name]}>{country.name}</option>
  })

  const handleCountry = (e) => {
      const code = e.target.value.split(",")
      const countryName = code[1]
      setCountry(countryName)
    const States = State.getAllStates().filter((state) => {
      return state.countryCode === code[0]
    })
    setstates(States)
  }

  let States;
  if (allStates) {
    States = allStates.map((state) => {
      return <option key={state.isoCode} value={[state.isoCode,state.name]}>{state.name}</option>
    })
  }

  const handlestate = (e) => {
    const code = e.target.value.split(",")
    const stateName = code[1]
    setState(stateName)
    const city = City.getAllCities().filter((city) => {
      return city.stateCode === code[0]
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
    setCiti(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      <div>
        <div>
          <div>
            <select onClick={handleCountry}>
              <option selected>Open this select your country</option>
              {Countries}
            </select>
          </div>
          <div>
            <select onClick={handlestate}>
              <option selected>Open this select state</option>
              {States ? States : ""}
            </select>
          </div>
          <div>
            <select onClick={handlecity}>
              <option selected>Open this select city</option>
              {cities ? cities : ""}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectCountry