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
let searchResults;



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
const myUpcomingBookingTitle = document.querySelector('.upcoming-bookings-title');
const myPastBookingTitle = document.querySelector('.past-bookings-title');
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

//// 🤨 About Page //////
// const aboutPage TBD


// INITIAL FETCH ON PAGE LOAD ----------------------------------------------->

Promise.all([
  retrieveData('http://localhost:3001/api/v1/customers'), 
  retrieveData('http://localhost:3001/api/v1/rooms'), 
  retrieveData('http://localhost:3001/api/v1/bookings')]).then(data => {

    currentCustomer = new Customer(data[0].customers[3], data[2].bookings) // will need to be based on login iteration eventually
    allBookings = new BookingRepo(data[2].bookings);
    allRooms = new RoomRepo(data[1].rooms);

    navBarHeading.innerText = `Welcome back, ${currentCustomer.name}!`

    populateDashboard()
  })


// EVENT LISTENERS ---------------------------------------------------------->

//// 🗺 Nav Bar //////
navButtonViewBookings.addEventListener('click', loadMyDashboard);
navButtonBookRoom.addEventListener('click', loadBookingPage);
navButtonBackHome.addEventListener('click', loadHomePage);
// remember the about page

//// 🤡 Dashboard Page //////


//// 📖 Booking Page //////
checkAvailabilityButton.addEventListener('click', displaySearchResults);



// FUNCTIONS ---------------------------------------------------------------->
//////////////////////
//// 🗺 Nav Bar //////
//////////////////////
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

  populateDashboard()
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


/////////////////////////////
//// 🤡 Dashboard Page //////
/////////////////////////////
function populateDashboard() {
  populateMoneySpent();
  populateMyUpcomingBookings();
  populateMyPastBookings();
  //idea for refactoring later - make the upcoming/past headings clickable, which unhides the display cards?
}

function populateMoneySpent() {
  const moneySpent = currentCustomer.findTotalMoneySpent(allRooms.list).toFixed(2);
  myBookingSpendText.innerText = `You have spent $${moneySpent} with us so far!`;
}

function populateMyUpcomingBookings() {
  myUpcomingBookingTitle.innerText = `Upcoming Bookings: ${currentCustomer.bookings.sortBookingsByToday().futureBookings.length}`;

  myUpcomingBookingDisplay.innerHTML = '';

  currentCustomer.bookings.sortBookingsByToday().futureBookings.forEach(booking => {
    myUpcomingBookingDisplay.innerHTML += `
      <section class="future-booking-record-display">
        <p class="booking-record-title-text">Your Upcoming Trip on ${booking.date}</p>
        <ul>
          <li class="booking-record-list-item">room number ${booking.findRoom(allRooms.list).number}</li>
          <li class="booking-record-list-item">${booking.findRoom(allRooms.list).roomType}</li>
          <li class="booking-record-list-item">${booking.findRoom(allRooms.list).numBeds} ${booking.findRoom(allRooms.list).bedSize} bed(s)</li>
          <li class="booking-record-list-item">rate: ${booking.findRoom(allRooms.list).costPerNight}</li>
        </ul>
      </section>
    `;
  })
}

function populateMyPastBookings() {
  myPastBookingTitle.innerText = `Past Bookings: ${currentCustomer.bookings.sortBookingsByToday().pastBookings.length}`;

  myPastBookingDisplay.innerHTML = '';

  currentCustomer.bookings.sortBookingsByToday().pastBookings.forEach(booking => {
    myPastBookingDisplay.innerHTML += `
      <section class="past-booking-record-display">
        <p class="booking-record-title-text">Your Trip on ${booking.date}</p>
        <ul>
          <li class="booking-record-list-item">room number ${booking.findRoom(allRooms.list).number}</li>
          <li class="booking-record-list-item">${booking.findRoom(allRooms.list).roomType}</li>
          <li class="booking-record-list-item">${booking.findRoom(allRooms.list).numBeds} ${booking.findRoom(allRooms.list).bedSize} bed(s)</li>
          <li class="booking-record-list-item">spent ${booking.findRoom(allRooms.list).costPerNight}</li>
        </ul>
      </section>
    `;
  })
}

///////////////////////////
//// 📖 Booking Page //////
///////////////////////////
function reformatInput(inputValue) {
  return inputValue.split('-').join('/');
}

function checkInput() {
  /* In here: check the input and depeninding on what's wrong,
      unhide certain error messages and set timeout AND return false
      
      But if it's good,
      requestedDate = reformatInput(inputValue whatever)
      return true
      */
}

function makeFilterTypes(searchResults) {
  //clear filter dropdown inner html
  //take search results and iterate over to make that the drop down
}

function displaySearchResults() {

  //check if input is valid

  /*if input is valid, then...

    search results area = ''

    searchResults = allRooms.filterByAvailable(requestedDate, allBookings.sortBookingsByToday().futureBookings)

    make filter types function

    searchResults.forEach 
      search results area += all this jazz

*/

}



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
