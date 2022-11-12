class RoomRepo {
  constructor(rooms) {
    this.list = rooms;
  }

  filterByType(type) { //takes in type selection in filter dropdown HTML
    return this.list.filter(room => room.roomType === type)
  }
  //returns an array

  filterByAvailable(year, month, day, futureBookings) { //<------taking these from the user input area, make sure they are strings
    if (typeof year === 'string' && typeof month === 'string' && typeof day === 'string') {

      const dateRequest = [year, month, day].join('/');
      const dateRequestNums = [+year, +month, +day];
      let dateRequestIsFuture = '';

      const todaysDate = new Date();
      const thisYear = todaysDate.getFullYear();
      const thisMonth = todaysDate.getMonth() + 1;
      const thisDay = todaysDate.getDate();

      if (dateRequestNums[0] < thisYear) {
        dateRequestIsFuture = false;
      } else if (dateRequestNums[0] > thisYear) {
        dateRequestIsFuture = true;
      } else if (dateRequestNums[1] < thisMonth) {
        dateRequestIsFuture = false;
      } else if (dateRequestNums[1] > thisMonth) {
        dateRequestIsFuture = true;
      } else if (dateRequestNums[2] < thisDay) {
        dateRequestIsFuture = false;
      } else {
        dateRequestIsFuture = true;
      }
  
      return this.list.filter(room => {
        return !futureBookings.find(booking => booking.roomNumber === room.number && booking.date === dateRequest)
          && dateRequestIsFuture
      });
    }
  }
  //returns an array
}

export default RoomRepo;