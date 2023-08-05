const filterUserTrips = (id, tripsData, destinationsData) => {
  if(tripsData.find(trip => trip.userID === id )){
  const userTrips = tripsData.filter((trip) => trip.userID === id);
  const userDestinations = userTrips.map((trip) => {
    trip.destinationName = destinationsData.find(
      (destination) => destination.id === trip.destinationID
    ).destination;
    return trip;
  });
  const handleReduce = (acc, userTrip) => {
    if (userTrip.status === "approved") {
      acc.past.push(userTrip);
    } else if (userTrip.status === "pending") {
      acc.pending.push(userTrip);
    }
    return acc;
  };
  const initialValue = {
    pending: [],
    past: [],
  };
  const variable = userDestinations.reduce(handleReduce, initialValue);
  return variable;
  }else{
    return `User ${id} cannot be found`
  }
};

// // trips object // //
// "destinationID": 23,
// "travelers": 6,
// "date": "2022/06/29",
// "duration": 7,

// Total amount I have spent on trips this year. This should be calculated from the trips data and include a travel agent’s 10% fee
// const calulateTripsCost = () => {
// use filterUserTrips func, iterate through all past trips
// map? over each trip, get flight cost(from destinationsData) x travelers (tripsData)
// duration(trips) x estimatedLodgingCostPerDay(destinations)
// add 10% agent fee
// return total cost of trip
// reduce mapped array of trips costs to acc (init value of 0)
// return acc

// }

export {
  filterUserTrips,
  // calculateTripsCost
};
