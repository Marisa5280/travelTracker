const filterUserTrips = (id, tripsData, destinationsData) => {
  if (tripsData.find((trip) => trip.userID === id)) {
    const userTrips = tripsData.filter((trip) => trip.userID === id);
    const userDestinations = userTrips.map((trip) => {
      trip.destinationName = destinationsData.find(
        (destination) => destination.id === trip.destinationID
      ).destination;
      return trip;
    });
    return userDestinations.reduce(
      (acc, userTrip) => {
        if (userTrip.status === "approved") {
          acc.past.push(userTrip);
        } else if (userTrip.status === "pending") {
          acc.pending.push(userTrip);
        }
        return acc;
      },
      {
        pending: [],
        past: [],
      }
    );
  } else {
    return `User ${id} cannot be found`;
  }
};

// // trips object // //
// "destinationID": 23,
// "travelers": 6,
// "date": "2022/06/29",
// "duration": 7,

// Total amount I have spent on trips this year. This should be calculated from the trips data and include a travel agent’s 10% fee
const calculateTripsCost = (id, tripsData, destinationsData) => {
  const userTrips = filterUserTrips(id, tripsData, destinationsData);
  const flightCost = userTrips.past.reduce((acc, trip) => {
    const destinationFlightCost = destinationsData.find(
      (destination) => destination.id === trip.destinationID
    ).estimatedFlightCostPerPerson;
    acc += trip.travelers * destinationFlightCost;
    return acc;
  }, 0);
  const lodgingCost = userTrips.past.reduce((acc, trip) => {
    const destinationLodgingCost = destinationsData.find(
      (destination) => destination.id === trip.destinationID
    ).estimatedLodgingCostPerDay;
    acc += trip.duration * destinationLodgingCost;
    return acc;
  }, 0);
  const agentFee = (flightCost + lodgingCost) * 0.1;
  return flightCost + lodgingCost + agentFee;
};

export { filterUserTrips, calculateTripsCost };
