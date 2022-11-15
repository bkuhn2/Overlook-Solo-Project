import chai from 'chai';
const expect = chai.expect;
import BookingRepo from '../src/classes/BookingRepo';
import Booking from '../src/classes/Booking';
import {sampleBookingsForRepo, sampleBookingsForRepo2} from './booking-repo-sample-data';

describe('Booking Repo', function() {

  let bookingRepo1, bookingRepo2, pastBookings1, futureBookings1;

  this.beforeEach('define variables for test', function() {
    bookingRepo1 = new BookingRepo(sampleBookingsForRepo);
    bookingRepo2 = new BookingRepo(sampleBookingsForRepo2);
    pastBookings1 = [sampleBookingsForRepo[1], sampleBookingsForRepo[2], sampleBookingsForRepo[4], sampleBookingsForRepo[5]];
    futureBookings1 = [sampleBookingsForRepo[0], sampleBookingsForRepo[3], sampleBookingsForRepo[6]];
  })

  it('should be a function', function() {
    expect(BookingRepo).to.be.a('function');
  });

  it('should store an array of bookings', function() {
    expect(bookingRepo1.list).to.be.a('array');
    expect(bookingRepo1.list).to.deep.equal(sampleBookingsForRepo)
  });

  it('these bookings should be instances of Booking', function() {
    expect(bookingRepo1.list[0]).to.be.an.instanceOf(Booking);
  });

  /* 🚨 Note for future testers: as the current date is relative, these below tests will at
     some point be outdated as they are currently being tested early November 2022. */

  it('should find its past bookings', function() {
    expect(bookingRepo1.sortBookingsByToday().pastBookings.length).to.equal(4)
    expect(bookingRepo2.sortBookingsByToday().pastBookings.length).to.equal(3)
    expect(bookingRepo1.sortBookingsByToday().pastBookings).to.deep.equal(pastBookings1)
  });

  it('should find its future bookings', function() {
    expect(bookingRepo1.sortBookingsByToday().futureBookings.length).to.equal(3)
    expect(bookingRepo2.sortBookingsByToday().futureBookings.length).to.equal(0)
    expect(bookingRepo1.sortBookingsByToday().futureBookings).to.deep.equal(futureBookings1)
  });

  it('should let you know if a date is not formatted correctly', function() {
    const bookingRepo3 = new BookingRepo([{
      id: "5fwrgu4i7k55hl78f",
      userID: 4,
      date: "2022/2/03",
      roomNumber: 14
      }]);
    
    expect(bookingRepo3.sortBookingsByToday()).to.equal('Please check the source data to make sure the date is writted in YYYY/MM/DD form.')
  });

});