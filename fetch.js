//const axios = require('axios');
//import axios from 'axios';
const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";
async function fetchSatelliteData() {
  try {
    const response = await fetch(apiUrl);

    // Check if the response is ok (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log(data); // Log the data to the console or process it as needed
  } catch (error) {
    console.error("Error fetching satellite data:", error);
  }
}

fetchSatelliteData();
/*
import { error } from "console";
import { response } from "express";

fetch('')
.then(response =>{
    response.json()
})
.then(data=>{
    console.log(data)
})
.then(error=>{
    console.error(error)
})
*/
