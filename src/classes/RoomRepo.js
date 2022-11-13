class RoomRepo {
  constructor(rooms) {
    this.list = rooms;
  }

  filterByType(type, availableRooms) { //takes in type selection in filter dropdown HTML
    return availableRooms.filter(room => room.roomType === type)
  }
  //returns an array

  filterByAvailable(dateRequest, futureBookings) { 
    //make sure argument is formatted the way we want

      const dateRequestNums = dateRequest.split('/').map(num => +num)
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
  //returns an array
}

export default RoomRepo;