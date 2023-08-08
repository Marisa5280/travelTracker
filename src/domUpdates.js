// This is where DOM manipulation functions live
// IMPORTS
import { filterUserTrips, getDestinationSelections } from "./functions";

// QUERY SELECTORS
const pastBox = document.querySelector(".trips_past_box");
const pendingBox = document.querySelector(".trips_pending_box");
const userDashboard = document.querySelector(".content_dashboard");
const newBookingButton = document.querySelector(".booking_button");
const backButton = document.querySelector(".back_button");
const bookingPage = document.querySelector(".content_booking");
const destinationSelection = document.querySelector(".destination-select");

// FUNCTIONS
const show = (element) => {
  element.classList.remove("hide");
};

const hide = (element) => {
  element.classList.add("hide");
};

const displayPastUserTrips = (id, tripsData, destinationsData) => {
  const sortedUserTrips = filterUserTrips(id, tripsData, destinationsData);
  sortedUserTrips.past.forEach((trip) => {
    pastBox.innerHTML += `<p>
    ${trip.destinationName}: ${trip.date}, travelers: ${trip.travelers}, length: ${trip.duration} days
  </p>`;
  });
};

const displayPendingUserTrips = (id, tripsData, destinationsData) => {
  const sortedUserTrips = filterUserTrips(id, tripsData, destinationsData);
  sortedUserTrips.pending.forEach((trip) => {
    pendingBox.innerHTML += `<p>
    ${trip.destinationName}: ${trip.date}, travelers: ${trip.travelers}, length: ${trip.duration} days
  </p>`;
  });
};

const showBookingPage = (mainData) => {
  hide(userDashboard);
  show(newBookingButton);
  show(backButton);
  show(bookingPage);
  handleNewBooking(mainData);
};

const handleNewBooking = (mainData) => {
  const { destinations, trips } = mainData;
  const destinationNames = getDestinationSelections(destinations);
  destinationNames.forEach(destination => {
    destinationSelection.innerHTML += `<option value="${destination}" tabindex='0'>${destination}</option>` 
  })
  const newTrip = {
    "id": trips.length,
    "status": "pending",
    "suggestedActivities": [],
    "userID": 2, // set to current user id after log in
    "destinationID": 0,
    "travelers": 0,
    "date": " ",
    "duration": 0
  };
};

export { displayPastUserTrips, displayPendingUserTrips, showBookingPage, handleNewBooking };
