import chai from "chai";
const expect = chai.expect;

import { filterUserTrips, calculateTripsCost } from "../src/functions";
// import sampleTrips from "../src/sample-data/trips";
// console.log("sampletrips", [sampleTrips.trips[0], sampleTrips.trips[1]]);

describe("filterUserTrips", () => {
  let tripsData;
  let destinationsData;
  beforeEach(() => {
    destinationsData = [
      {
        id: 1,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image:
          "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =2089 &q =80",
        alt: "overview of city buildings with a clear sky",
      },
      {
        id: 2,
        destination: "Stockholm, Sweden",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image:
          "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =1950 &q =80",
        alt: "city with boats on the water during the day time",
      },
      {
        id: 3,
        destination: "Sydney, Austrailia",
        estimatedLodgingCostPerDay: 130,
        estimatedFlightCostPerPerson: 950,
        image:
          "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =1950 &q =80",
        alt: "opera house and city buildings on the water with boats",
      },
      {
        id: 4,
        destination: "Cartagena, Colombia",
        estimatedLodgingCostPerDay: 65,
        estimatedFlightCostPerPerson: 350,
        image:
          "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =1650 &q =80",
        alt: "boats at a dock during the day time",
      },
      {
        id: 5,
        destination: "Madrid, Spain",
        estimatedLodgingCostPerDay: 150,
        estimatedFlightCostPerPerson: 650,
        image:
          "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =1950 &q =80",
        alt: "city with clear skys and a road in the day time",
      },
    ];
    tripsData = [
      {
        id: 1,
        userID: 1,
        destinationID: 1,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 2,
        userID: 2,
        destinationID: 5,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 3,
        userID: 1,
        destinationID: 2,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "pending",
        suggestedActivities: [],
      },
      {
        id: 4,
        userID: 1,
        destinationID: 3,
        travelers: 2,
        date: "2022/02/25",
        duration: 10,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 5,
        userID: 1,
        destinationID: 4,
        travelers: 3,
        date: "2022/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
    ];
  });
  it("should be a function", () => {
    expect(filterUserTrips).to.be.a("function");
  });

  it("should get a users trips", () => {
    expect(filterUserTrips(1, tripsData, destinationsData)).to.deep.equal({
      pending: [
        {
          date: "2022/05/22",
          destinationID: 2,
          destinationName: "Stockholm, Sweden",
          duration: 17,
          id: 3,
          status: "pending",
          suggestedActivities: [],
          travelers: 4,
          userID: 1
        }
      ],
      past: [
        {
          date: "2022/09/16",
          destinationID: 1,
          destinationName: "Lima, Peru",
          duration: 8,
          id: 1,
          status: "approved",
          suggestedActivities: [],
          travelers: 1,
          userID: 1,
        },
        {
          date: "2022/02/25",
          destinationID: 3,
          destinationName: "Sydney, Austrailia",
          duration: 10,
          id: 4,
          status: "approved",
          suggestedActivities: [],
          travelers: 2,
          userID: 1
        },
        {
        date: "2022/04/30",
        destinationID: 4,
        destinationName: "Cartagena, Colombia",
        duration: 18,
        id: 5,
        status: "approved",
        suggestedActivities: [],
        travelers: 3,
        userID: 1
        }
      ],
    });
  });

  it('should give an error for invalid user', () => {
    expect(filterUserTrips(51, tripsData, destinationsData)).to.deep.equal(`User 51 cannot be found`)
  })
});

describe('calculateTripsCost function', () => {
  let tripsData;
  let destinationsData;
  beforeEach(() => {
    destinationsData = [
      {
        id: 1,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image:
          "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =2089 &q =80",
        alt: "overview of city buildings with a clear sky",
      },
      {
        id: 2,
        destination: "Stockholm, Sweden",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image:
          "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =1950 &q =80",
        alt: "city with boats on the water during the day time",
      },
      {
        id: 3,
        destination: "Sydney, Austrailia",
        estimatedLodgingCostPerDay: 130,
        estimatedFlightCostPerPerson: 950,
        image:
          "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =1950 &q =80",
        alt: "opera house and city buildings on the water with boats",
      },
      {
        id: 4,
        destination: "Cartagena, Colombia",
        estimatedLodgingCostPerDay: 65,
        estimatedFlightCostPerPerson: 350,
        image:
          "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =1650 &q =80",
        alt: "boats at a dock during the day time",
      },
      {
        id: 5,
        destination: "Madrid, Spain",
        estimatedLodgingCostPerDay: 150,
        estimatedFlightCostPerPerson: 650,
        image:
          "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1 &ixid =eyJhcHBfaWQiOjEyMDd9 &auto =format &fit =crop &w =1950 &q =80",
        alt: "city with clear skys and a road in the day time",
      },
    ];
    tripsData = [
      {
        id: 1,
        userID: 1,
        destinationID: 1,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 2,
        userID: 2,
        destinationID: 5,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 3,
        userID: 1,
        destinationID: 2,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "pending",
        suggestedActivities: [],
      },
      {
        id: 4,
        userID: 1,
        destinationID: 3,
        travelers: 2,
        date: "2022/02/25",
        duration: 10,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 5,
        userID: 1,
        destinationID: 4,
        travelers: 3,
        date: "2022/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
    ];
  });

  it('should be a function', () => {
    expect(calculateTripsCost).to.be.a('function')
  })

  it('should return total cost plus agent fee', () => {
    expect(calculateTripsCost(1, tripsData, destinationsData)).to.equal(7018)
  })
})