import chai from 'chai';
const expect = chai.expect;
import BookingRepo from '../src/classes/BookingRepo';
import Booking from '../src/classes/Booking';
import RoomRepo from '../src/classes/RoomRepo';
import {sampleRoomsForRepo} from '../test/room-repo-sample-data'

describe('Room Repo', function() {

  let roomRepo1;

  this.beforeEach('define variables for test', function() {

    roomRepo1 = new RoomRepo(sampleRoomsForRepo);

  })

  it('should be a function', function() {
    expect(RoomRepo).to.be.a('function');
  });

  it('should store an array of rooms', function() {
    expect(roomRepo1.list).to.be.a('array');
    expect(roomRepo1.list).to.deep.equal(sampleRoomsForRepo)
  });
});