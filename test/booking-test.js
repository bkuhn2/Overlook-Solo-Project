import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking'
import {sampleBookings, sampleRooms} from '../test/booking-sample-data'

describe('Booking', function() {

  let bookingData1, bookingData2, bookingData3, bookingInstance1, bookingInstance2, bookingInstance3;

  this.beforeEach('define variables for test', function() {
    bookingData1 = sampleBookings[0];
    bookingData2 = sampleBookings[2];
    bookingData3 = sampleBookings[1]
    bookingInstance1 = new Booking(bookingData1)
    bookingInstance2 = new Booking(bookingData2)
    bookingInstance3 = new Booking(bookingData3)
  })

  it('should be a fuction', function() {
    expect(Booking).to.be.a('function');
  });

  it('should have an ID', function() {
    expect(bookingInstance1.id).to.be.a('string');
    expect(bookingInstance1.id).to.equal('5fwrgu4i7k55hl6sz');
  });

  it('should have the customer\'s user ID', function() {
    expect(bookingInstance1.userID).to.be.a('number');
    expect(bookingInstance1.userID).to.equal(9);
  });

  it('should have a date', function() {
    expect(bookingInstance1.date).to.be.a('string');
    expect(bookingInstance1.date).to.equal('2022/04/22');
  });

  it('should have a room number', function() {
    expect(bookingInstance1.roomNumber).to.be.a('number');
    expect(bookingInstance1.roomNumber).to.equal(15);
  });

  it('should take in an object argument', function() {
    
    const bookingInstance4 = new Booking('a2kj34hk23j4', 14, '1991/01/01', 5)

    expect(bookingInstance4.id).to.equal(undefined);
    expect(bookingInstance4.userID).to.equal(undefined);
    expect(bookingInstance4.date).to.equal(undefined);
    expect(bookingInstance4.roomNumber).to.equal(undefined);
  });

  it('should know who how much it cost the customer', function() {
    expect(bookingInstance1.findCost(sampleRooms)).to.equal(294.56);
    expect(bookingInstance2.findCost(sampleRooms)).to.equal(172.09);
  });

  it('should let the customer know if they can\'t find the room to get the cost', function() {
    expect(bookingInstance3.findCost(sampleRooms)).to.equal('Could not find the room in our system, please check again to make sure number is correct');
  });
});
