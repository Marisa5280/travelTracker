// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import { promises, addNewTrip } from "./apiCalls";
import {
  displayUserDashboard,
  displayTripsCost,
  displayPastUserTrips,
  displayPendingUserTrips,
  showBookingPage,
  handleNewBooking,
  resetDashboard,
} from "./domUpdates";
import { logInValidation } from "./functions";

// QUERY SELECTORS //
const newBookingButton = document.querySelector(".booking_button");
const submitRequestButton = document.querySelector(".booking_request-button");
const newBookingDate = document.querySelector(".booking_date");
const newBookingTravelers = document.querySelector(".booking_travelers");
const newBookingDuration = document.querySelector(".booking_length");
const newBookingDestination = document.querySelector(".destination-select");
const backButton = document.querySelector(".back_button");
const userName = document.querySelector("#username");
const password = document.querySelector("#password");
const logInButton = document.querySelector(".submit");

// DATA MODEL //
const mainData = {};
let userId = null;
const currentUser = {};

// EVENT LISTENTERS //
logInButton.addEventListener("click", (e) => {
  e.preventDefault();
  userId = logInValidation(userName.value, password.value);
  startWebPage(userId);
  displayUserDashboard();
});

const startWebPage = (userId) => {
  displayPastUserTrips(userId, mainData.trips, mainData.destinations);
  displayPendingUserTrips(userId, mainData.trips, mainData.destinations);
  displayTripsCost(userId, mainData.trips, mainData.destinations)
  newBookingButton.addEventListener("click", () => {
    showBookingPage(mainData);
    handleNewBooking(mainData);
  });
  submitRequestButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newTrip = {
      id: mainData.trips.length + 1,
      status: "pending",
      suggestedActivities: [],
      userID: userId, // set to current user id after log in
      destinationID: parseInt(newBookingDestination.value),
      travelers: newBookingTravelers.value,
      date: `${newBookingDate.value.replace(/-/g, "/")}`,
      duration: newBookingDuration.value,
    };
    addNewTrip(newTrip);
  });
};

window.addEventListener("load", () => {
  const [allTravelersData, allTripsData, allDestinationsData] = promises;
  Promise.all([allTravelersData(), allTripsData(), allDestinationsData()])
    .then((response) => {
      const [allTravelersData, allTripsData, allDestinationsData] = response;
      mainData.travelers = allTravelersData;
      mainData.trips = allTripsData;
      mainData.destinations = allDestinationsData;
    });
});

backButton.addEventListener("click", () => {
  resetDashboard();
  const [allTravelersData, allTripsData, allDestinationsData] = promises;
  Promise.all([allTravelersData(), allTripsData(), allDestinationsData()])
    .then((response) => {
      const [allTravelersData, allTripsData, allDestinationsData] = response;
      mainData.travelers = allTravelersData;
      mainData.trips = allTripsData;
      mainData.destinations = allDestinationsData;
    })
    .then(() => startWebPage(userId));
});
