import chai from 'chai';
const expect = chai.expect;
import BookingRepo from '../src/classes/BookingRepo';
import Booking from '../src/classes/Booking';
import RoomRepo from '../src/classes/RoomRepo';
import {sampleCustomers, sampleBookingsForCustomers} from '../test/customer-sample-data'
import Customer from '../src/classes/Customer';

describe('Customer', function() {

  let customer1, customer2, customer3;

  this.beforeEach('define variables for test', function() {
    customer1 = new Customer();
    customer2 = new Customer();
    customer3 = new Customer();
  })

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should store an array of rooms', function() {
    // expect(roomRepo1.list).to.be.a('array');
    // expect(roomRepo1.list).to.deep.equal(sampleRoomsForRepo)
  });

});