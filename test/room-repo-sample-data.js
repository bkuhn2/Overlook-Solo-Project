const sampleRoomsForRepo = [
  {
    number: 1,
    roomType: "residential suite",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 358.4
  },
  {
    number: 2,
    roomType: "suite",
    bidet: false,
    bedSize: "full",
    numBeds: 2,
    costPerNight: 477.38
  },
  {
    number: 3,
    roomType: "single room",
    bidet: false,
    bedSize: "king",
    numBeds: 1,
    costPerNight: 491.14
  },
  {
    number: 22,
    roomType: "single room",
    bidet: false,
    bedSize: "full",
    numBeds: 2,
    costPerNight: 350.31
  },
  {
    number: 18,
    roomType: "junior suite",
    bidet: false,
    bedSize: "king",
    numBeds: 2,
    costPerNight: 496.41
  },
  {
    number: 23,
    roomType: "residential suite",
    bidet: false,
    bedSize: "queen",
    numBeds: 2,
    costPerNight: 176.36
  }
];

const sampleBookingsForRoomRepo = [
  {
    id: "5fwrgu4i7k55hl7cw",
    userID: 27,
    date: "2023/11/17",
    roomNumber: 22
  },
  {
    id: "5fwrgu4i7k55hl7dk",
    userID: 44,
    date: "2023/11/18",
    roomNumber: 22
  },
  {
    id: "5fwrgu4i7k55hl8at",
    userID: 4,
    date: "2023/11/17",
    roomNumber: 23
  },
  {
    id: "5fwrgu4i7k55hl8ay",
    userID: 8,
    date: "2022/01/18",
    roomNumber: 3
  }
];

const november17FilteredRooms = [
  {
    number: 1,
    roomType: "residential suite",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 358.4
  },
  {
    number: 2,
    roomType: "suite",
    bidet: false,
    bedSize: "full",
    numBeds: 2,
    costPerNight: 477.38
  },
  {
    number: 3,
    roomType: "single room",
    bidet: false,
    bedSize: "king",
    numBeds: 1,
    costPerNight: 491.14
  },
  {
    number: 18,
    roomType: "junior suite",
    bidet: false,
    bedSize: "king",
    numBeds: 2,
    costPerNight: 496.41
  }
]

export {sampleRoomsForRepo, sampleBookingsForRoomRepo, november17FilteredRooms}