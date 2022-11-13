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
let filteredSearchResults;



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
const bookingErrorTextPastDate = document.querySelector('#pastDateText');
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

function checkInputFuture(inputValue) {
  const inputNums = inputValue.split('-').map(num => +num)
  const todaysDate = new Date();
  const thisYear = todaysDate.getFullYear();
  const thisMonth = todaysDate.getMonth() + 1;
  const thisDay = todaysDate.getDate();

  if (inputNums[0] < thisYear) {
    return false;
  } else if (inputNums[0] > thisYear) {
    return true;
  } else if (inputNums[1] < thisMonth) {
    return false;
  } else if (inputNums[1] > thisMonth) {
    return true;
  } else if (inputNums[2] < thisDay) {
    return false;
  } else {
    return true;
  }
}

// window.addEventListener('click', function () {console.log(checkInputFuture('2021-14-33'))})

function checkInputValid(inputValue) {
  const inputNums = inputValue.split('-').map(num => +num);
  const months31 = [1, 3, 5, 7, 8, 10, 12]
  const months30 = [4, 6, 9, 11]

  if (inputValue === '') {
    unHide(bookingErrorTextInvalidDate);
    return false;
  } else if (inputValue.split('-')[0].length > 4) {
    unHide(bookingErrorTextInvalidDate);
    return false;
  } else if (!checkInputFuture(inputValue)) {
    unHide(bookingErrorTextPastDate);
    return false;
  } else if (months31.includes(inputNums[1]) && inputNums[2] > 31) {
    unHide(bookingErrorTextInvalidDate);
    return false;
  } else if (months30.includes(inputNums[1]) && inputNums[2] > 30) {
    unHide(bookingErrorTextInvalidDate);
    return false;
  } else if (inputNums[1] === 2 & inputNums[2] > 28) {
    //NOTE: the Overlook Hotel does not book leap year dates.
    unHide(bookingErrorTextInvalidDate);
    return false;
  } else if (inputValue === '') {
    unHide(bookingErrorTextInvalidDate);
    return false;
  } else {
    requestedDate = reformatInput(inputValue);
    return true;
  }
}

function makeFilterTypes(searchResults) {
  filterDropDown.innerHTML = `
  <option disabled selected value> select a room type to filter</option>
  `;

  const listOfTypes = [];
  searchResults.forEach(room => {
    if (!listOfTypes.includes(room.roomType)) {
      listOfTypes.push(room.roomType)
    }
  });

  listOfTypes.forEach(type => {
    filterDropDown.innerHTML += `
    <option value="${type}">${type}</option>
    `
  });
}

function resetSearchResults() {
  hide(bookingErrorTextInvalidDate);
  hide(bookingErrorTextNoAvailable);
  hide(bookingErrorTextPastDate);
  makeInvisible(filterArea);
  makeInvisible(bookingConfirmArea);

  availableRoomsDisplayArea.innerHTML = '';
  filterDropDown.innerHTML = '';
  bookingConfirmText.innerText = '';
}

function displaySearchResults() {
  
  resetSearchResults();
  checkInputValid(dateInput.value);

  if (checkInputValid(dateInput.value)) {
    searchResults = allRooms.filterByAvailable(requestedDate, allBookings.sortBookingsByToday().futureBookings)

    makeFilterTypes(searchResults);
    makeVisible(filterArea);

    
  }

  /*if input is valid, then...


    searchResults = allRooms.filterByAvailable(requestedDate, allBookings.sortBookingsByToday().futureBookings)
    make filter
 

    searchResults.forEach 
      search results area += all this jazz

*/

}

//filter button - clear search results, define filteredSerachResults, repopulate searchresult 

//need clear search results button
//    hide all error messages
//    wipe all inner html
//    hide filter
//    hide selection panel booking confirm area
//    reset input value


/////////////////////
//// 🤓 Helper //////
/////////////////////
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
