import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking'
import {sampleBookings} from '../test/booking-sample-data'

describe('Booking', function() {

  let bookingData1, bookingInstance1;

  this.beforeEach('define variables for test', function() {
    bookingData1 = sampleBookings[0];
    bookingInstance1 = new Booking(bookingData1)
  })

  it('should be a fuction', function() {
    expect(Booking).to.be.a('function');
  });

  it('should have an ID', function() {
    expect(bookingInstance1.id).to.be.a('string');
    expect(bookingInstance1.id).to.equal('5fwrgu4i7k55hl6sz');
  });

  it('should have a user ID', function() {
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
    
    const bookingInstance2 = new Booking('a2kj34hk23j4', 14, '1991/01/01', 5)

    expect(bookingInstance2.id).to.equal(undefined);
    expect(bookingInstance2.userID).to.equal(undefined);
    expect(bookingInstance2.date).to.equal(undefined);
    expect(bookingInstance2.roomNumber).to.equal(undefined);
  });

});
