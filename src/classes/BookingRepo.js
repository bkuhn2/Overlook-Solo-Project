import Booking from "./Booking";

class BookingRepo {
  constructor(bookings) {
    this.list = bookings.map(booking => new Booking(booking));
  }

  sortBookingsByToday() {
    const sortedBookings = {
      pastBookings: [],
      futureBookings: []
    }
    const badFormatting = []
    const todaysDate = new Date();
    const thisYear = todaysDate.getFullYear();
    const thisMonth = todaysDate.getMonth() + 1;
    const thisDay = todaysDate.getDate();

    this.list.forEach((booking) => {
      const dateNums = booking.date.split('/').map(num => +num);
      const dateNumJoined = booking.date.split('/').join('')

      if (dateNumJoined.length !== 8){
        badFormatting.push(booking)
      } else if (
        (dateNums[0] < thisYear) ||
        (dateNums[0] === thisYear && dateNums[1] < thisMonth) ||
        (dateNums[0] === thisYear && dateNums[1] === thisMonth && dateNums[2] < thisDay)
        ) {
        sortedBookings.pastBookings.push(booking);
      } else {
        sortedBookings.futureBookings.push(booking);
      }
    })

    if (badFormatting.length === 0) {
      return sortedBookings;
    } else {
      return 'Please check the source data to make sure the date is writted in YYYY/MM/DD form.'
    }

  }
}

export default BookingRepo;