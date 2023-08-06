// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import { promises } from './apiCalls';
import {displayPastUserTrips, displayPendingUserTrips} from './domUpdates'

// console.log('This is the JavaScript entry file - your code begins here.');
const mainData = {};

const startWebPage = () => {
  displayPastUserTrips(2, mainData.trips, mainData.destinations);
  displayPendingUserTrips(2, mainData.trips, mainData.destinations)
  console.log('maindata',mainData)
}

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

