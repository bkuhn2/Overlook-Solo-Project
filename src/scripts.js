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
let requestedDate;
let selectedRoom;
let searchResults;
let filteredSearchResults;



// QUERY SELECTORS ---------------------------------------------------------->

//// 🌎 Body //////
const pageBody = document.querySelector('#body');

//// 🔑 Log-In Page //////
const userNameInput = document.querySelector('#userNameInput');
const passwordInput = document.querySelector('#passwordInput');
const loginButton = document.querySelector('.login-button');
const loginErrorText = document.querySelector('.login-error-text');

//// 🗺 Nav Bar //////
const navBarHeading = document.querySelector('.nav-title-text');
const navButtonViewBookings = document.querySelector('#navViewBookings');
const navButtonBookRoom = document.querySelector('#navBookRoom');
const navButtonBackHome = document.querySelector('#navBackHome');

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
const bookButton = document.querySelector('.book-button');
const bookingErrorTextInvalidDate = document.querySelector('#invalidDateText');
const bookingErrorTextNoAvailable = document.querySelector('#noAvailableRoomsText');
const bookingErrorTextPastDate = document.querySelector('#pastDateText');
const bookingErrorInternalIssue = document.querySelector('#internalErrorText');
const filterArea = document.querySelector('.available-filter-area');
const filterDropDown = document.querySelector('#typeFilter');
const filterButton = document.querySelector('.available-filter-button');
const clearFilterButton = document.querySelector('.clear-filter-button');
const availableRoomsDisplayArea = document.querySelector('.available-rooms-display-area');
const bookingSuccessText = document.querySelector('.booking-success-text');


// INITIAL FETCH ON PAGE LOAD ----------------------------------------------->

Promise.all([ //move this to other function w/ login concept
  retrieveData('http://localhost:3001/api/v1/customers'), 
  retrieveData('http://localhost:3001/api/v1/rooms'), 
  retrieveData('http://localhost:3001/api/v1/bookings')])
    .then(data => {

    currentCustomer = new Customer(data[0].customers[20], data[2].bookings) // will need to be based on login iteration eventually
    allBookings = new BookingRepo(data[2].bookings);
    allRooms = new RoomRepo(data[1].rooms);

    navBarHeading.innerText = `Welcome back, ${currentCustomer.name}!`

    populateDashboard()
  })
    .catch(error => {
      console.log('in catch: ', error);
      //make this something you see on the DOM - but need to figure out login page first..
    })


// EVENT LISTENERS ---------------------------------------------------------->

//// 🔑 Log-In Page //////


//// 🗺 Nav Bar //////
navButtonViewBookings.addEventListener('click', loadMyDashboard);
navButtonBookRoom.addEventListener('click', loadBookingPage);
navButtonBackHome.addEventListener('click', loadHomePage);

//// 📖 Booking Page //////
checkAvailabilityButton.addEventListener('click', displaySearchResults);
filterButton.addEventListener('click', displayFilteredResults);
clearFilterButton.addEventListener('click', clearFilteredResults);
availableRoomsDisplayArea.addEventListener('click', showBookingConfirmArea)
bookButton.addEventListener('click', bookRoom)


// FUNCTIONS ---------------------------------------------------------------->
//////////////////////
//// 🗺 Nav Bar //////
//////////////////////
function loadMyDashboard() {
  hide(homePage);
  hide(bookingPage);
  unHide(myBookingsPage);

  resetSearchResults();
  dateInput.value = '';

  clickNavButton(navButtonViewBookings);
  unClickNavButton(navButtonBackHome);
  unClickNavButton(navButtonBookRoom);

  pageBody.classList.add('my-bookings-background');
  pageBody.classList.remove('home-background');
  pageBody.classList.remove('booking-background');

  populateDashboard()
}

function loadBookingPage() {
  hide(homePage);
  hide(myBookingsPage);
  unHide(bookingPage);

  resetSearchResults();
  dateInput.value = '';

  clickNavButton(navButtonBookRoom);
  unClickNavButton(navButtonBackHome);
  unClickNavButton(navButtonViewBookings);

  pageBody.classList.remove('my-bookings-background');
  pageBody.classList.remove('home-background');
  pageBody.classList.add('booking-background');
}

function loadHomePage() {
  hide(bookingPage);
  hide(myBookingsPage);
  unHide(homePage)

  resetSearchResults();
  dateInput.value = '';

  clickNavButton(navButtonBackHome);
  unClickNavButton(navButtonBookRoom);
  unClickNavButton(navButtonViewBookings);

  pageBody.classList.remove('my-bookings-background');
  pageBody.classList.add('home-background');
  pageBody.classList.remove('booking-background');
}


/////////////////////////////
//// 🤡 Dashboard Page //////
/////////////////////////////
function populateDashboard() {
  populateMoneySpent();
  populateMyUpcomingBookings();
  populateMyPastBookings();
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
        <h6 class="booking-record-title-text">Your Upcoming Trip on ${booking.date}</h6>
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
        <h6 class="booking-record-title-text">Your Trip on ${booking.date}</h6>
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
    <option disabled selected value>select a room type to filter</option>
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
  hide(bookingErrorInternalIssue);
  makeInvisible(filterArea);
  makeInvisible(clearFilterButton);
  makeInvisible(bookingConfirmArea);

  availableRoomsDisplayArea.innerHTML = '';
  filterDropDown.innerHTML = '';
  bookingConfirmText.innerText = '';
}

function populateSearchResultsArea(roomList) {
  roomList.forEach(room => {
    const roomTypeDisplay = room.roomType.toUpperCase();
    if (room.bidet) {
      availableRoomsDisplayArea.innerHTML += `
      <section class="available-room" id="${room.number}">
        <h5 class="room-title">${roomTypeDisplay}</h5>
        <ul class="room-list">
          <li class="room-feature">Room #${room.number}</li>
          <li class="room-feature">${room.numBeds} ${room.bedSize} bed(s)</li>
          <li class="room-feature">Has a bidet</li>
          <li class="room-feature">$${room.costPerNight} per night</li>
        </ul>
        <button class="room-select-button" type="button">Select This Room</button>
      </section>
      `;
    } else {
      availableRoomsDisplayArea.innerHTML += `
      <section class="available-room" id="${room.number}">
        <h5 class="room-title">${roomTypeDisplay}</h5>
        <ul class="room-list">
          <li class="room-feature">Room #${room.number}</li>
          <li class="room-feature">${room.numBeds} ${room.bedSize} bed(s)</li>
          <li class="room-feature">$${room.costPerNight} per night</li>
        </ul>
        <button class="room-select-button" type="button">Select This Room</button>
      </section>
      `;
    }
  });
}

function displaySearchResults() {
  resetSearchResults();
  checkInputValid(dateInput.value);

  if (checkInputValid(dateInput.value)) {
    searchResults = new RoomRepo(allRooms.filterByAvailable(requestedDate, allBookings.sortBookingsByToday().futureBookings))
    
    makeFilterTypes(searchResults.list);
    makeVisible(filterArea);
    populateSearchResultsArea(searchResults.list);
  }
}

function displayFilteredResults() {
  availableRoomsDisplayArea.innerHTML = '';
  makeVisible(clearFilterButton);
  
  filteredSearchResults = searchResults.filterByType(filterDropDown.value);

  populateSearchResultsArea(filteredSearchResults);
}

function clearFilteredResults() {
  availableRoomsDisplayArea.innerHTML = '';
  populateSearchResultsArea(searchResults.list);
  makeFilterTypes(searchResults.list);
  makeInvisible(clearFilterButton);
}

function showBookingConfirmArea(event) {
  if (event.target.className === 'room-select-button') {
    const dateComponents = requestedDate.split('/')
    const displayDate = `${+dateComponents[1]}/${+dateComponents[2]}/${+dateComponents[0]}`;
    makeVisible(bookingConfirmArea);
    selectedRoom = allRooms.list.find(room => room.number === +event.target.parentElement.id);
    bookingConfirmText.innerText = `Book Room ${selectedRoom.number} on ${displayDate}?`;
    window.scrollTo({top: 0, left: 50, behavior: 'smooth'});
  }
}

function bookRoom() {
  resetSearchResults();
  dateInput.value = '';
  postNewBooking();
}

function postNewBooking() {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(currentCustomer.makeBookingData(selectedRoom.number, requestedDate))
  }).then(response => {
    
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Response not OK - look at issue in body')
    }
  })
    .then(data => {
    unHide(bookingSuccessText);
    setTimeout(hideSuccessText, 4000);
    updateBookings(data.newBooking);
  })
    .catch(error => {
      console.log('for the devs: ', error);
      unHide(bookingErrorInternalIssue);
    })
}

function updateBookings(rawBooking) {
  currentCustomer.bookings.list.push(new Booking(rawBooking));
  allBookings.list.push(new Booking(rawBooking));
  populateDashboard();
}

/////////////////////
//// 🤓 Helper //////
/////////////////////
function hide(element) {
  element.classList.add('hide');
}

function hideSuccessText() {
  bookingSuccessText.classList.add('hide')
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

function clickNavButton(element) {
  element.classList.add('clicked')
}

function unClickNavButton(element) {
  element.classList.remove('clicked')
}
