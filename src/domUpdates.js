// This is where DOM manipulation functions live
// IMPORTS
import { filterUserTrips, calculateTripsCost } from "./functions";

// QUERY SELECTORS
const pastBox = document.querySelector(".trips_past_box");
const pendingBox = document.querySelector(".trips_pending_box");
const userDashboard = document.querySelector(".content_dashboard");
const newBookingButton = document.querySelector(".booking_button");
const backButton = document.querySelector(".back_button");
const bookingPage = document.querySelector(".content_booking");
const login = document.querySelector(".login");
const totalCost = document.querySelector(".total_cost")
// FUNCTIONS
const show = (element) => {
  element.classList.remove("hide");
};

const hide = (element) => {
  element.classList.add("hide");
};

const displayUserDashboard = () => {
  hide(login);
  show(userDashboard);
  show(newBookingButton);
};

const displayTripsCost = (id, tripsData, destinationsData) => {
  totalCost.innerText = calculateTripsCost(id, tripsData, destinationsData)
}

const displayPastUserTrips = (id, tripsData, destinationsData) => {
  pastBox.innerHTML = "";
  const sortedUserTrips = filterUserTrips(id, tripsData, destinationsData);
  sortedUserTrips.past.forEach((trip) => {
    pastBox.innerHTML += `<p>
    ${trip.destinationName}: ${trip.date}, travelers: ${trip.travelers}, length: ${trip.duration} days
  </p>`;
  });
};

const displayPendingUserTrips = (id, tripsData, destinationsData) => {
  pendingBox.innerHTML = "";
  const sortedUserTrips = filterUserTrips(id, tripsData, destinationsData);
  sortedUserTrips.pending.forEach((trip) => {
    pendingBox.innerHTML += `<p>
    ${trip.destinationName}: ${trip.date}, travelers: ${trip.travelers}, length: ${trip.duration} days
  </p>`;
  });
};

const createDestinationSelections = (destinationsData) => {
  const destinationOptions = document.getElementById("destination");
  return destinationsData.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.text = destination.destination;
    destinationOptions.appendChild(option);
  });
};

const showBookingPage = (mainData) => {
  hide(userDashboard);
  hide(newBookingButton);
  show(backButton);
  show(bookingPage);
  handleNewBooking(mainData);
};

const handleNewBooking = (mainData) => {
  const { destinations } = mainData;
  createDestinationSelections(destinations);
};

const resetDashboard = () => {
  show(userDashboard);
  show(newBookingButton);
  hide(backButton);
  hide(bookingPage);
};

export {
  displayUserDashboard,
  displayPastUserTrips,
  displayPendingUserTrips,
  showBookingPage,
  handleNewBooking,
  resetDashboard,
  displayTripsCost
};
