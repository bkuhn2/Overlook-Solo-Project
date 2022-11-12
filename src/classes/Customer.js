import BookingRepo from "./BookingRepo";

class Customer {
  constructor(customerInfo, allBookings) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.bookings = new BookingRepo(allBookings.filter(booking => booking.userID === customerInfo.id))
  }


}

export default Customer;