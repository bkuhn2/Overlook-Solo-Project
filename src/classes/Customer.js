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

}

export default Customer;