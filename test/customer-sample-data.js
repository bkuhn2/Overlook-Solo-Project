
const sampleCustomers = [
  {
    id: 5,
    name: "Rhiannon Little"
  },
  {
    id: 6,
    name: "Fleta Schuppe"
  },
  {
    id: 9,
    name: "Faustino Quitzon"
  }
];

const sampleBookingsForCustomers = [
  {
    id: "5fwrgu4i7k55hl87a",
    userID: 5,
    date: "2022/02/25",
    roomNumber: 3
  },
  {
    id: "5fwrgu4i7k55hl87c",
    userID: 5,
    date: "2023/01/30",
    roomNumber: 10
  },
  {
    id: "5fwrgu4i7k55hl87d",
    userID: 5,
    date: "2022/01/23",
    roomNumber: 25
  },
  {
    id: "5fwrgu4i7k55hl87i",
    userID: 6,
    date: "2022/01/26",
    roomNumber: 9
  },
  {
    id: "5fwrgu4i7k55hl87j",
    userID: 9,
    date: "2024/02/12",
    roomNumber: 2
  },
  {
    id: "5fwrgu4i7k55hl87m",
    userID: 9,
    date: "2023/02/08",
    roomNumber: 8
  }
];

const sampleRoomsForCustomers = [
  {
    number: 3,
    roomType: "single room",
    bidet: false,
    bedSize: "king",
    numBeds: 1,
    costPerNight: 491.14
  },
  {
    number: 8,
    roomType: "junior suite",
    bidet: false,
    bedSize: "king",
    numBeds: 1,
    costPerNight: 261.26
  },
  {
    number: 9,
    roomType: "single room",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 200.39
  },
  {
    number: 10,
    roomType: "suite",
    bidet: false,
    bedSize: "twin",
    numBeds: 1,
    costPerNight: 497.64
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
    number: 23,
    roomType: "residential suite",
    bidet: false,
    bedSize: "queen",
    numBeds: 2,
    costPerNight: 176.36
  },
  {
    number: 24,
    roomType: "suite",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 327.24
  },
  {
    number: 25,
    roomType: "single room",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 305.85
  }
]

export {sampleCustomers, sampleBookingsForCustomers, sampleRoomsForCustomers};