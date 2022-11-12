// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

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

//// 🤡 My Bookings Page //////
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



// EVENT LISTENERS ---------------------------------------------------------->

//// 🗺 Nav Bar //////
navButtonViewBookings.addEventListener('click', loadMyDashboard);
navButtonBookRoom.addEventListener('click', loadBookingPage);
navButtonBackHome.addEventListener('click', loadHomePage);
// remember the about page





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
