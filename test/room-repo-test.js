import chai from 'chai';
const expect = chai.expect;
import BookingRepo from '../src/classes/BookingRepo';
import Booking from '../src/classes/Booking';
import RoomRepo from '../src/classes/RoomRepo';
import {sampleRoomsForRepo, sampleBookingsForRoomRepo} from '../test/room-repo-sample-data'

describe('Room Repo', function() {

  let roomRepo1, bookingRepoTest;

  this.beforeEach('define variables for test', function() {

    roomRepo1 = new RoomRepo(sampleRoomsForRepo);
    bookingRepoTest = new BookingRepo(sampleBookingsForRoomRepo)

  })

  it('should be a function', function() {
    expect(RoomRepo).to.be.a('function');
  });

  it('should store an array of rooms', function() {
    expect(roomRepo1.list).to.be.a('array');
    expect(roomRepo1.list).to.deep.equal(sampleRoomsForRepo)
  });

  it('should filter its rooms by type', function() {
    expect(roomRepo1.filterByType()).to.be.a('array');
    expect(roomRepo1.filterByType('presidential suite')).to.deep.equal([]);
    expect(roomRepo1.filterByType('residential suite')).to.deep.equal([
      {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 23,
        roomType: "residential suite",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 176.36
      }
    ]);
    expect(roomRepo1.filterByType('single room')).to.deep.equal([
      {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 22,
        roomType: "single room",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 350.31
      }
    ]);
  });

  it('should filter its rooms by which are available', function() {

    console.log(roomRepo1.filterByAvailable("2023", "02", "22", bookingRepoTest.sortBookingsByToday().futureBookings))
    console.log(roomRepo1.filterByAvailable("2023", "11", "17", bookingRepoTest.sortBookingsByToday().futureBookings))


    expect(roomRepo1.list).to.be.a('array');
    expect(roomRepo1.list).to.deep.equal(sampleRoomsForRepo)
  });


});