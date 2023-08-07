// This is where DOM manipulation functions live
// IMPORTS
import { filterUserTrips } from "./functions";

// QUERY SELECTORS
const pastBox = document.querySelector(".trips_past_box");
const pendingBox = document.querySelector(".trips_pending_box");

// FUNCTIONS
const show = (element) => {
  element.removeAttribute('hidden')
}

const hide = (element) => {
  element.setAttribute('hidden')
}

const displayPastUserTrips = (id, tripsData, destinationsData) => {
  const sortedUserTrips = filterUserTrips(id, tripsData, destinationsData);
  sortedUserTrips.past.forEach((trip) => {
    console.log('trip', trip)
    pastBox.innerHTML += `<p>
    ${trip.destinationName}: ${trip.date}, travelers: ${trip.travelers}, length: ${trip.duration} days
  </p>`;
  });
};

const displayPendingUserTrips = (id, tripsData, destinationsData) => {
  const sortedUserTrips = filterUserTrips(id, tripsData, destinationsData);
  sortedUserTrips.pending.forEach((trip) => {
    pendingBox.innerHTML +=`<p>
    ${trip.destinationName}: ${trip.date}, travelers: ${trip.travelers}, length: ${trip.duration} days
  </p>`;
  });
};
// show user trips on dashboard
// get past trips box element and assign to var
// insert past trips to past box element
// get pending trips box element and assign to var
// insert pending trips to pending box element
export { displayPastUserTrips, displayPendingUserTrips };
