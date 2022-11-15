class RoomRepo {
  constructor(rooms) {
    this.list = rooms;
  }

  filterByType(type) {
    return this.list.filter(room => room.roomType === type)
  }

  filterByAvailable(dateRequest, futureBookings) { 
      const dateRequestNums = dateRequest.split('/').map(num => +num)
      let dateRequestIsFuture = '';

      const todaysDate = new Date();
      const thisYear = todaysDate.getFullYear();
      const thisMonth = todaysDate.getMonth() + 1;
      const thisDay = todaysDate.getDate();

      if (
        (dateRequestNums[0] < thisYear) ||
        (dateRequestNums[0] === thisYear && dateRequestNums[1] < thisMonth) ||
        (dateRequestNums[0] === thisYear && dateRequestNums[1] === thisMonth && dateRequestNums[2] < thisDay)
      ) {
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

export default RoomRepo;