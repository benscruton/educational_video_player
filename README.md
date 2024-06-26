# Learnwell

Hello! I am Ben Scruton, and this is my showcase for the 10Fold "Educational Video Player."

## Technology and Features

### Technology

I wrote my front end using React; in addition, I wrote a back-end Express server that a) serves the production build of the react project, and b) sends API requests to the server and does a little bit of data processing, to avoid CORS issues and help keep things organized.

The video player itself as well as almost all of the controls are powered by the NPM package `react-player`; the only exception is the full screen button, which uses the `screenfull` package.

I used the CSS library Bulma for most of the styling. Because it's built entirely in CSS without any JavaScript, I find it to be a good choice for JavaScript front end projects. In my experience, other style libraries that do use JavaScript (for example, Materialize) can sometimes lead to conflicts with the React code that cause unexpected behaviors.

I also wrote one custom CSS module to style my video control component, as I wanted to be able to adjust the layout and design of these controls a bit more precisely than the stock Bulma classes allow.

A few other packages that play smaller roles in the code are:

- `dayjs` to format the timestamps on comments
- `jstz` to determine the user's time zone, again for the comment timestamps
- `axios` to streamline API calls, as I find the syntax a bit less verbose than the way JavaScript handles it natively

### Features

#### Navigation

The site features a Bulma-styled navbar, featuring:

- A link to a search page, where you can search videos by username
- A link to a video form, where users can add new videos
- A login button
- Once a user has logged in, they'll also see a direct link to their own videos

<img alt = "Home page and nav bar, desktop view" src = "/demoImages/home-page-and-navbar.png" />

It's optimized for mobile as well, so the links will collapse into an expandable menu on smaller screens.

<img alt = "Mobile nav bar" src = "/demoImages/mobile-menu.gif" />

#### Search functionality and video list

The search page is pretty straightforward -- enter a username, and it'll bring up a page with all of the videos that user has added.  The list of videos displays as a series of Bulma "Card" components, to keep things cleaner visually.

<img alt = "Search page for finding user videos" src = "/demoImages/user-search.png" />

If possible, the app will find a thumbnail image to use for the video; if this cannot be found, it just uses a stock video image that I created based on the provided logo.  The number of comments is also listed underneath the video.

<img alt = "User page, showing a user's submitted videos" src = "/demoImages/user-video-page.png" />

#### Adding videos

The form used to add a video does require that a user be logged in, since a user_id attribute is required for each video submission.

When a user submit the form, the app will do some validation to make sure the inputs are valid:
 
- The title field cannot be empty
- The URL field cannot be empty, and must point to a playable video URL (a number of video sites are accepted, as well as direct links to video files like .mp4s)
- The description field, however, *can* be left blank.

<img alt = "Video form, showing an erroneous submission and the site's validation feedback" src = "/demoImages/video-form-with-validation.png" />

#### The video page

Clicking any card from a user's video list will open a page dedicated to that video, which features:

- The video's title at the top
- The actual video player
- The video controls, which show up directly underneath the video
- A link to open the video's original source in a new tab
- The video's description as provided by the user
- A link back to the list of the user's videos
- All comments on the video, as well as a box to add your own comment (which is disabled if the user isn't logged in).

(The choppiness in the gif below is just my screen recorder -- the video plays smoothly on the actual site!)

<img alt = "Demonstration of video controls" src = "/demoImages/playback-controls.gif" />

In full screen mode, the video controls move to an overlay superimposed over the bottom portion of the video. When hovering over this section of the video (or tapping it on a touch-screen device), the controls are visible; as soon as the cursor is moved to another area, the controls disappear so the user can see the full video uninterrupted.

<img alt = "Full screen demo" src = "demoImages/full-screen-controls.gif" />

In addition, if a user is logged in and viewing a video that they uploaded, there is also an edit button.  Editing is handled without leaving the page, simply by turning the title and description fields into text inputs.

<img alt = "Editing video converts the title and description paragraphs to text inputs" src = "/demoImages/edit-video.gif" />

Finally, all user comments for the video show up at the bottom of the page, with a textarea input at the end to add a new comment. This textarea is disabled if the user is not logged in.

I've also added an advanced feature that allows users to reply to top-level comments. This is handled by submitting a stringified JSON as the comment's `content` attribute, which contains a boolean `isReply` set to "true" and a `replyTo` attribute set to the ID of the parent comment, as well as a `content` attribute of its own that will actually be displayed as the reply content.

<img alt = "The comments section" src = "/demoImages/comments.png" />


#### Other nifty features

A few small things:

- When a user enters full screen mode for the first time, they'll see a pop-up with some brief instructions for using and hiding the controls.  This only shows up once (per browser), and is indicated in localStorage so that it won't show up again.

<img alt = "The instruction pop-up when a user enters full screen the first time" src = "/demoImages/full-screen-instructions.png" />

- When a user adds a video, they'll be redirected to the page for the video they've just added.  This was a little tricky since the API response to the Create Video route doesn't give you back the new video's ID, so once it's been created I make a second API call on the back end to find the most recently added video and then grab the ID from there.

- For the comment timestamp, I've written a custom display function that's a little friendlier to read than just a raw date/time: if a comment was made today, it will show up as "Today at (time)"; if it was the previous day, it will show up as "Yesterday at (time)", and if it was made within the previous week then only the weekday is included (e.g. "Monday at 2:30 pm").  Only older comments include the full date.

- When adjusting the playback speed, the update interval on the playback bar adjusts to match so that the seconds are updated properly (i.e. when playing at 2x speed, it updates every half second, and when playing at 0.75x it will update every 1-and-1/3 seconds, and so on).

- When logged in, any comments from the logged in user will show up in green with a "(me)" indicator next to their username

## Running the project

There are a number of ways to run this project, depending on where you want to be on the spectrum from production environment to development environment.

### Online

The easiest way to view and test the project is just to view it online! I've deployed it to:

https://learnwell.benscruton.horse

### Running locally

Note: these commands are all written from the perspective of a Linux user.  I believe everything would work the same in MacOS; it may be different in Windows.

All options for running locally will start with the same two steps:

First, clone the repository

```
$ git clone https://github.com/benscruton/educational_video_player.git
```

Next, you'll need to create a `.env` file in the project's root directory, with the following information:

```
SERVER_URL="https://take-home-assessment-423502.uc.r.appspot.com"

PORT=8000 ## This can be omitted, as it defaults to port 8000.
```

#### Docker

To run the project with Docker, make sure Docker is installed, and then run the following command:

```
$ docker compose up -d --build
```

Once it's built, it will be available at http://localhost:8027.  The port can be changed by editing `docker-compose.yml`.

Note that if you change the port in the `.env` from the default 8000, you'll need to update that in the `docker-compose.yml` file as well.

#### Running locally in production mode

To run the server in production mode, first build the production version of the application:

```
$ cd client
$ yarn build
```

Next, navigate back to the root directory and start the project using `node`:

```
$ cd ..
$ node server.js
```

The project will be available at http://localhost:8000 (or whichever port is used in `.env`, if different).

#### Running locally in development mode

To run in development mode, you will need to run the back end and front end servers separately.

First, start the back end server:

```
$ node server.js
```

If you are using a different port than 8000 to run the back end server, you'll need to update the port in `client/src/App.js` line 32.  If you're using the default port 8000, no edits needed!

Then, in a different terminal window, start the development React server:

```
$ cd client
$ yarn start
```

The React project will be available at http://localhost:3000, and the Express server will be available at http://localhost:8000.

