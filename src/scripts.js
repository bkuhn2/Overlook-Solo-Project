// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import './css/styles.css';

import retrieveData from './apiCalls';
import Customer from './classes/Customer';
import Booking from './classes/Booking';
import BookingRepo from './classes/BookingRepo';
import RoomRepo from './classes/RoomRepo';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


// VARIABLES ---------------------------------------------------------------->

let currentCustomer;
let allBookings;
let allRooms;
let currentPage; //??
let requestedDate;
let selectedRoom;



// QUERY SELECTORS ---------------------------------------------------------->

//// 🌎 Body //////
const pageBody = document.querySelector('#body');

//// 🗺 Nav Bar //////
const navBarHeading = document.querySelector('.nav-title-text');
const navButtonViewBookings = document.querySelector('#navViewBookings');
const navButtonBookRoom = document.querySelector('#navBookRoom');
const navButtonBackHome = document.querySelector('#navBackHome');
const navButtonAbout = document.querySelector('#navAbout');

//// 🏡 Home Page //////
const homePage = document.querySelector('.home-page');

//// 🤡 Dashboard Page //////
const myBookingsPage = document.querySelector('.my-bookings');
const myBookingSpendText = document.querySelector('.past-booking-spend-text');
const myUpcomingBookingDisplay = document.querySelector('.my-upcoming-bookings-display-area');
const myPastBookingDisplay = document.querySelector('.my-past-bookings-display-area');


//// 📖 Booking Page //////
const bookingPage = document.querySelector('.booking-page');
const dateInput = document.querySelector('.booking-input-field');
const checkAvailabilityButton = document.querySelector('.check-availability-button');
const bookingConfirmArea = document.querySelector('.booking-confirm-area');
const bookingConfirmText = document.querySelector('.booking-confirm-text');
const bookingErrorTextInvalidDate = document.querySelector('#invalidDateText');
const bookingErrorTextNoAvailable = document.querySelector('#noAvailableRoomsText');
const filterArea = document.querySelector('.available-filter-area');
const filterDropDown = document.querySelector('#typeFilter');
const filterButton = document.querySelector('.available-filter-button');
const availableRoomsDisplayArea = document.querySelector('.available-rooms-display-area');

//// ⁉ About Page //////
// const aboutPage = 'tbd';


// INITIAL FETCH ON PAGE LOAD ----------------------------------------------->

Promise.all([
  retrieveData('http://localhost:3001/api/v1/customers'), 
  retrieveData('http://localhost:3001/api/v1/rooms'), 
  retrieveData('http://localhost:3001/api/v1/bookings')]).then(data => {

    currentCustomer = new Customer(data[0].customers[3], data[2].bookings) // will need to be based on password iteration eventually
    allBookings = new BookingRepo(data[2].bookings);
    allRooms = new RoomRepo(data[1].rooms);

    navBarHeading.innerText = `Welcome back, ${currentCustomer.name}!`
    //function load dashboard

    // console.log(currentCustomer.bookings.sortBookingsByToday());
    // console.log(allRooms.filterByAvailable("2023/12/14", allBookings.sortBookingsByToday().futureBookings));

    // console.log('all rooms: ', allRooms);
    // console.log('current customer: ', currentCustomer);
    // console.log('allBookings: ', allBookings);
    // console.log(data)

  })


// EVENT LISTENERS ---------------------------------------------------------->

//// 🗺 Nav Bar //////
navButtonViewBookings.addEventListener('click', loadMyDashboard);
navButtonBookRoom.addEventListener('click', loadBookingPage);
navButtonBackHome.addEventListener('click', loadHomePage);
// remember the about page

//// 🤡 Dashboard Page //////


//// 📖 Booking Page //////




// FUNCTIONS ---------------------------------------------------------------->

//// 🗺 Nav Bar //////
function loadMyDashboard() {
  hide(homePage);
  hide(bookingPage);
  // hide(aboutPage);
  unHide(myBookingsPage);

  makeVisible(navButtonBackHome);
  makeVisible(navButtonBookRoom);
  makeVisible(navButtonAbout);
  makeInvisible(navButtonViewBookings);

  pageBody.classList.add('my-bookings-background');
  pageBody.classList.remove('home-background');
  pageBody.classList.remove('booking-background');
  //remove about backround
}

function loadBookingPage() {
  hide(homePage);
  hide(myBookingsPage);
  // hide(aboutPage);
  unHide(bookingPage)

  makeVisible(navButtonViewBookings);
  makeVisible(navButtonBackHome);
  makeVisible(navButtonAbout);
  makeInvisible(navButtonBookRoom);

  pageBody.classList.remove('my-bookings-background');
  pageBody.classList.remove('home-background');
  pageBody.classList.add('booking-background');
  //remove about backround
}

function loadHomePage() {
  hide(bookingPage);
  hide(myBookingsPage);
  // hide(aboutPage);
  unHide(homePage)

  makeVisible(navButtonViewBookings);
  makeVisible(navButtonBookRoom);
  makeVisible(navButtonAbout);
  makeInvisible(navButtonBackHome);

  pageBody.classList.remove('my-bookings-background');
  pageBody.classList.add('home-background');
  pageBody.classList.remove('booking-background');
  //remove about backround
}

function loadAboutPage() {
//tbd
}



//// 🤡 Dashboard Page //////




//// 📖 Booking Page //////




//// 🤓 Helper //////
function hide(element) {
  element.classList.add('hide');
}

function unHide(element) {
  element.classList.remove('hide');
}

function makeInvisible(element) {
  element.classList.add('invisible');
}

function makeVisible(element) {
  element.classList.remove('invisible');

}
