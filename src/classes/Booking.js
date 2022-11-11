
class Booking {
  constructor(rawBooking) { //<-----takes individual booking object from fetch
    this.id = rawBooking.id;
    this.userID = rawBooking.userID;
    this.date = rawBooking.date;
    this.roomNumber = rawBooking.roomNumber;
  }

  findCost(allRooms) {
    if (allRooms.find(room => room.number === this.roomNumber)) {
      return allRooms.find(room => room.number === this.roomNumber).costPerNight
    } else {
      return 'Could not find the room in our system, please check again to make sure number is correct'
    }
  }

}

export default Booking;