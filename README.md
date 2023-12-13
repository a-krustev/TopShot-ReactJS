# Project tracker

TopShot application made with ReactJS where users can register, login, create and participate contests. Every registered user can create contest, edit and delete it. Also they can participate in other users contests and like all photos in all competitions. They could check the contests that they participate in.

Notifications - There are notifications when users type incorrect data and there is pop-up when user like photo.

Pages:

public part:

- Home page - The main page with some information about the application.
- Login - Users can login if not yet registered they can follow the link to the register page which is located ot login page. The page has data validation on both client and server side.
- Register - Users can register and if they have profile they can follow the link to the login page. The page has data validation on both client and server side.
- Contests - The page with all contests shows list of contests and some information about them.
- Categories Page - The page with all categories and most popular contests.
- Details - Detailed info about the contest and add photo/participate/ in contest.

private part:

- Add photo - Page with simple form with input type url where users can add their photos. After photo publication app redirects to detail page of contest.
- New Contest - Every logged user can run contest, but cannot participate in it. Submit redirects to the created contests details page.
- Profile page - Every user can check basic information about itself and which contests participate in.

There are guards that redirects when guest users try to view restricted page and opposite.

Libraries:
- React-router-dom;
- react-cookie;
- react-popup;
- react-datepicker;
- react-hook-form;
- jquery.

* RUN both client and server parts with "npm i" and "npm start"...
