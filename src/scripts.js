// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { promises } from './apiCalls';

console.log('This is the JavaScript entry file - your code begins here.');
const mainData = {};

const startWebPage = () => {
  console.log('maindata',mainData)
}
// get destinations data
// get user trips
window.addEventListener('load', () => {
  Promise.all(promises)
  .then(response => {
    const [allTravelersData, allTripsData, allDestinationsData] = response;
    mainData.travelers = allTravelersData;
    mainData.trips = allTripsData;
    mainData.destinations = allDestinationsData;
  })
  .then(startWebPage)
});

// filter trips data by user id
// map filtered arr to combine destinations data to trips arr
// reduce into an object with keys past and pending
// get past trips box element and assign to var
// insert past trips to past box element
// get pending trips box element and assign to var
// insert pending trips to pending box element
  
  
  
  
  // "destinationID": 23,
// "travelers": 6,
// "date": "2022/06/29",
// "duration": 7,