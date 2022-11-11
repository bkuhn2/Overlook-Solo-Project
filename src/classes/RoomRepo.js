class RoomRepo {
  constructor(rooms) {
    this.list = rooms;
  }

  filterByType(type) {
    return this.list.filter(room => room.roomType === type)
  }

}

export default RoomRepo;