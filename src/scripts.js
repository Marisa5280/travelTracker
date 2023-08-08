// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import { promises, addNewTrip } from './apiCalls';
import {displayPastUserTrips, displayPendingUserTrips, showBookingPage, handleNewBooking, resetDashboard} from './domUpdates';

// QUERY SELECTORS //
const newBookingButton = document.querySelector('.booking_button');
const submitRequestButton = document.querySelector('.booking_request-button');
const newBookingDate = document.querySelector('.booking_date');
const newBookingTravelers = document.querySelector('.booking_travelers');
const newBookingDuration = document.querySelector('.booking_length');
const newBookingDestination = document.querySelector('.destination-select');
const backButton = document.querySelector('.back_button');

// DATA MODEL //
const mainData = {};

const startWebPage = () => {
  displayPastUserTrips(2, mainData.trips, mainData.destinations);
  displayPendingUserTrips(2, mainData.trips, mainData.destinations);
  newBookingButton.addEventListener('click', () => {
    showBookingPage(mainData);
    handleNewBooking(mainData);
  });
  submitRequestButton.addEventListener('click', (e) => {
    e.preventDefault();
    const newTrip = {
      id: mainData.trips.length + 1,
      status: "pending",
      suggestedActivities: [],
      userID: 2, // set to current user id after log in
      destinationID: parseInt(newBookingDestination.value),
      travelers: newBookingTravelers.value,
      date: `${newBookingDate.value.replace(/-/g, '/')}`,
      duration: newBookingDuration.value
    };
    addNewTrip(newTrip);
  })
  
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

backButton.addEventListener('click', () => {
  resetDashboard();
  Promise.all(promises)
  .then(response => {
    const [allTravelersData, allTripsData, allDestinationsData] = response;
    mainData.travelers = allTravelersData;
    mainData.trips = allTripsData;
    mainData.destinations = allDestinationsData;
  })
  .then(startWebPage)
})


export {mainData};