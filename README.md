# Overlook Hotel

### Abstract
This app simulates a hotel website where a customer can log-in and see their past and upcoming trips they've booked, as well as booking a new trip on a date they specify and seeing how much they've spent at the hotel so far. The user can also filter their search results by room type. It was created as an assignment at Turing School of Software and Design. Once you log-in, you will embody a fabricated "customer" and use the app as they would.

This project also was built using a mocha/chai test suite to ensure bug-free functionality.

### Installation Instructions
1. Clone down this repo by clicking the 'code' button in the top right of this GitHub page and copying the SSH address. Then in your terminal, having setup git, run `git clone [address copied from github here]` and cd into the directory. Run `npm install`.
2. Once the repo is cloned down, run `npm start` in the terminal and find the line `Project is running at http://localhost:8080` and go to this local host address in your browser.
3. You will also need to clone down the 'back end' repo for this - the repo is located at https://github.com/turingschool-examples/overlook-api. Once this is cloned down and you `cd` into the directory, run `npm install` and `npm start` in the terminal. You can also find the data and necessary endpoints in its readMe.
4. **Important:** When first opening the app, you will see a place to enter a name and password. Because it is a simulation type app and security is not the focus, the password is "overlook2021" and the username is any variation of the word "customer" and a number between 1 and 50, i.e., "customer50", "customer2", "customer1", "customer35", et cetera.
5. You will also be able to utilize the test files by running `npm test` in the terminal, and will see the results and summary of all the tests being run.

### Preview of App
![Screen Shot 2022-11-14 at 8 42 27 PM](https://user-images.githubusercontent.com/110054994/202000209-e5270fe5-aec7-4af9-8318-53e619f97e66.png)

![Screen Shot 2022-11-14 at 8 40 28 PM](https://user-images.githubusercontent.com/110054994/202000240-fd636bf0-5a1f-4385-b601-516a0cb54f84.png)


### Context
This app was created as the final project of Mod2 at Turing and was comprised of 6 continuous days of work where this was the sole focus. This marks roughly the halfway point of the Turing program is the last major project that utilizes so-called "vanilla" javascript and encapsulates everything we've learned so far.

### Contributors
This was a solo project built by Brett Kuhn. 
https://github.com/bkuhn2

### Learning Goals
- strong focus on testing
- project planning from the outset
- using Javascript iterator methods
- refactoring code to improve, make more efficient and not be repetitive/redundant
- using fetch API (GET and POST)
- addressing error handling both preemptively and when an error occurs so the user knows and has actionable information.
- making the app as accessible as possible for all users
- practice git work flow and professionalism, along with a GitHub project and issues

### Technology Used
VS Code, Javascript, HTML, CSS, Mocha and Chai testing, git, GitHub, terminal, WebPack, Lighthouse, Dalton and WAVE chrome extensions

### Wins & Challenges
- A big win was feeling that I successfully planned this from the start which made building it and writing the actual code much more streamlined than in the past. Also, successful use of iterator methods and anticipating/planning for user edge case scenarious.
- Probably the biggest challenge was time and getting a considerable amount of work in before the due date and making decisions on what features to include versus those to drop.

### Possible Additions, Improvements Going Forward
- Sorting bookings by date and search results by price
- Additional CSS functionality with animation, hover states, zoom, transparency, et cetera
- Improved icons for rooms and bookings - pictures of potential rooms, feature icons
- Improved titling for data generated automatically - for example, displaying the price total with commas ("$3,000.34" vs #3000.34)

