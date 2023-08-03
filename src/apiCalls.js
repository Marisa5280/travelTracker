const allTravelersData = fetch('http://localhost:3001/api/v1/travelers')
  .then(response => response.json())
  .then(data => data.travelers);

const oneTravelerData = (id) => {
  fetch(`http://localhost:3001/api/v1/travelers/${id}`)
  .then(response => response.json())
  .then(data => console.log(data)); 
}

const allTripsData = fetch('http://localhost:3001/api/v1/trips')
  .then(response => response.json())
  .then(data => data.trips);

const allDestinationsData = fetch('http://localhost:3001/api/v1/destinations')
  .then(response => response.json())
  .then(data => data.destinations);

// const requestObj = {id: number, userID: 50, destinationID: number, travelers: number, date: 'YYYY/MM/DD', duration: number, status: 'approved' or 'pending', suggestedActivities: array of strings};
const addNewTrip = (data) => {
  fetch('http://localhost:3001/api/v1/trips', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => console.log(data));
};
// addNewTrip(requestObj);
export {
  oneTravelerData,
  addNewTrip
}
export const promises = [
  allTravelersData,
  allTripsData,
  allDestinationsData,
];
