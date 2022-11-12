import chai from 'chai';
const expect = chai.expect;
import BookingRepo from '../src/classes/BookingRepo';
import Booking from '../src/classes/Booking';
import RoomRepo from '../src/classes/RoomRepo';
import {sampleCustomers, sampleBookingsForCustomers, sampleRoomsForCustomers} from '../test/customer-sample-data'
import Customer from '../src/classes/Customer';

describe('Customer', function() {

  let customer1, customer2, customer3;

  this.beforeEach('define variables for test', function() {
    customer1 = new Customer(sampleCustomers[0], sampleBookingsForCustomers);
    customer2 = new Customer(sampleCustomers[1], sampleBookingsForCustomers);
    customer3 = new Customer(sampleCustomers[2], sampleBookingsForCustomers);
  })

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should have an ID', function() {
    expect(customer1.id).to.equal(5);
    expect(customer2.id).to.equal(6);
    expect(customer3.id).to.equal(9);
  });

  it('should have a repository of all their bookings', function() {
    expect(customer1.bookings.list).to.deep.equal([
      {id: "5fwrgu4i7k55hl87a", userID: 5, date: "2022/02/25", roomNumber: 3},
      {id: "5fwrgu4i7k55hl87c", userID: 5, date: "2023/01/30", roomNumber: 10},
      {id: "5fwrgu4i7k55hl87d", userID: 5, date: "2022/01/23", roomNumber: 25}]);
    expect(customer2.bookings.list).to.deep.equal([{id: "5fwrgu4i7k55hl87i", userID: 6, date: "2022/01/26", roomNumber: 9}]);
    expect(customer3.bookings.list).to.deep.equal([
      {id: "5fwrgu4i7k55hl87j", userID: 9, date: "2024/02/12", roomNumber: 2},
      {id: "5fwrgu4i7k55hl87m", userID: 9, date: "2023/02/08", roomNumber: 8}]);
  });

  it('their booking repo should be an instance of BookingRepo', function() {
    expect(customer1.bookings).to.be.an.instanceOf(BookingRepo);
    expect(customer2.bookings).to.be.an.instanceOf(BookingRepo);
    expect(customer3.bookings).to.be.an.instanceOf(BookingRepo);
  });

  it('the bookings in their repo should be instances of Booking', function() {
    expect(customer1.bookings.list[2]).to.be.an.instanceOf(Booking);
    expect(customer2.bookings.list[0]).to.be.an.instanceOf(Booking);
    expect(customer3.bookings.list[1]).to.be.an.instanceOf(Booking);
  });

  it('should find the cost of all their past bookings', function() {
    expect(customer1.findTotalMoneySpent(sampleRoomsForCustomers)).to.equal(796.99);
    expect(customer2.findTotalMoneySpent(sampleRoomsForCustomers)).to.equal(200.39);
    expect(customer3.findTotalMoneySpent(sampleRoomsForCustomers)).to.equal(0);
  });


});