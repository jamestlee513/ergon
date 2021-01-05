# Ergon README.md

Ergon (greek for 'work') is an all-in-one productivity web app that allows you to have all your productivity widgets in one location! Plan out your day, write memos to yourself, play background music to help get in the zone, and check off to-dos through pomodoro sessions that you can even sync with friends!

## Minimum Viable Product (MVP)

### 1. Hosting on Heroku

* Hosted on a live link that never sleeps

### 2. New account creation, login, and demo login

* Users can sign up, sign in, log out
* Users can use a demo login to try the site
* Users can't use features without logging in

### 3. Day planner

* Users will be able to write into a 1 day calendar what events and tasks they have for the day in a calendar-like widget
* Calendar events will save to the user's account
* A ticker will display with a horizontal line on the day display to indicate what time it is relative to the schedule
* The day planner will be able to be hidden or shown to the user
* (Bonus) Users will be able to plan out as many days in advance as they would like.

### 4. Memos

* Users will have a personal memo pad that they can write notes on
* Memos will be saved to the user account
* Memos will be displayed when the user is planning out their day on the day planner in case they need to reference for what they need to get done
* Memos will be able to be hidden or shown to the user

### 5. Pomodoro Timer

* Users will be able to start a pomodoro timer during their work sessions
* Users will be able to customize the interval of the work timer and break timer
* The pomodoro timer will be able to be hidden or shown to the user
* (Bonus) Users will be able to sync their pomodoro timers with other users with pomodoro group sessions

### 6. Background music

* Users will have a playbar that will play background music on the webpage
* Users will be able to skip, repeat, backtrack and scroll songs with the playbar

### 7. (Bonus) Friends

* (Bonus) Users will be able to add their friends to a friends list 
* (Bonus) Users will be able to display their status (active, working, do not disturb)
* (Bonus) Users will be able to chat to their friends in group and private messages
* (Bonus) Users will be able to sync their pomodoro sessions together in pomodoro group sessions

# Database Models/Schema

![alt text](https://user-images.githubusercontent.com/19562787/103700557-8101e200-4f59-11eb-96b6-587e47879ab1.png)

# Tech Used

* Node.js
* React.js
* Flask
* Vanilla JS
* Vanilla CSS

# Routes

## Backend

### User routes

* GET /users/ -> Authenticates a user
* POST /users/login -> Logs a user in
* GET /users/logout -> Logs out a user
* POST /users/signup -> Creates a new user and logs them in
* GET /users/<user_id> -> Returns user information by id
* POST /users/settings/<user_id> -> Creates a new setting item for the user
* GET /users/settings/<user_id> -> Returns a user's settings
* PUT /users/settings/<user_id> -> Edits a user's settings


### Day Plans routes

* POST /dayplans/new -> Creates a new day plan
* GET /dayplan/<user_id> -> Returns the day plan for today if it exists
* PUT /dayplans/<user_id> -> Edits the day plan for today if it exists
* DELETE /dayplans/<user_id> -> Deletes the day plan for today

### Events routes

* POST /dayplan/<user_id>/new -> Creates a new event for the user's day plan
* GET /dayplan/<user_id> -> Returns all events for a user's day plan
* PUT /dayplan/ -> Edits an event based on the sent data

### Memos routes

* POST /memos/new -> Creates a new memo in the database
* GET /memos/<user_id> -> Returns the user's saved memo if it exists
* PUT /memos/<user_id> -> Edits the user's saved memo

### Friends routes

* POST /friends/new -> Adds a new friend to the user's friends list
* GET /friends/<user_id> -> Returns a user's friends list
* DELETE /friends/delete -> Removes a friend from a user's friends list

## Planning to do:

* Tech Used
* Routes
* Components List
* Wireframes
