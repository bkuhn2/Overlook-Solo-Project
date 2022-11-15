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
    const bookingData = {};
    bookingData["userID"] = this.id;
    bookingData["date"] = date;
    bookingData["roomNumber"] = roomNumber;
    
    return bookingData;
  }

}

export default Customer;