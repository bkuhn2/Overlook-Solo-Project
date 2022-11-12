import BookingRepo from "./BookingRepo";

class Customer {
  constructor(customerInfo, allBookings) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.bookings = new BookingRepo(allBookings.filter(booking => booking.userID === customerInfo.id))
  }

  findTotalMoneySpent(allRooms) {
    return this.bookings.sortBookingsByToday().pastBookings.reduce((total, booking) => {
      total += booking.findCost(allRooms);
      return total;
    }, 0)
  }

  makeBookingData(roomNumber, date) {
    //needs a failsafe so it can't book something that's not bookable.... also the dom
    //room repo, filter by available and if a room in that array has this roomNumber then youre good
    const bookingData = {};
    bookingData["userID"] = this.id;
    bookingData["date"] = date; // needs to be either passed in as a complete string or joined here
    bookingData["room Number"] = roomNumber;

    return bookingData;
  }

}

export default Customer;