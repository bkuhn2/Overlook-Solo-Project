class RoomRepo {
  constructor(rooms) {
    this.list = rooms;
  }

  filterByType(type) {
    return this.list.filter(room => room.roomType === type)
  }

  filterByAvailable(year, month, day, futureBookings) { //<------taking these from the user input area, make sure they are strings
    // if (typeof year === 'string' && typeof month === 'string' && typeof day === 'string') {
    // }
    // not sure about this if statement - revisit?

    const dateRequest = [year, month, day].join('/');
    console.log(dateRequest);

    return this.list.filter(room => {
      return !futureBookings.find(booking => {
        return booking.roomNumber === room.number && booking.date === dateRequest
      })
    })


    // const availableRooms = []

    // this.list.forEach(room => {
    //   if (futureBookings.find(booking.roomNumber === room.number) === undefined && 
    //       futureBookings.find(booking.date === dateRequest) === undefined) {
        
    //   }
    // });
  }

}

export default RoomRepo;