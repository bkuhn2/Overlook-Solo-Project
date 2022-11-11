import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking'
import {sampleBookings} from '../test/booking-sample-data'

describe('Booking', function() {

  let booking1;

  this.beforeEach('define variables for test', function() {
    booking1 = sampleBookings[0]
  })

  it('should be a fuction', function() {
    expect(Booking).to.be.a('function');
  });

  it('should have an fuction', function() {

    expect(Booking).to.be.a('function');
  });

});
