/* import axios from "axios";
import React, { useState } from "react"; */
import "./BrowseImage.css";

const BrowseImage = () => {
  /*  const [query, setQuery] = useState("");
  

  async function getImages() {
    console.log("access to getAllProducts");
    const endpoint = `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}%20&format=json&apiKey=41ff15ef6d914c4aa4d53d1c7c848744`;

    await axios
      .get(endpoint)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.results) {
          setCountry(data.results[0].country);
          setState(data.results[0].state);
          setDistrict(data.results[0].county);
        }
      })
      .catch(console.error);
  } */

  return (
    <div>
      <div className="searchBar__container">
        <input type="search" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default BrowseImage;
