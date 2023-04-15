# Project tracker

TopShot application made with ReactJS where users can register, login, create and participate contests.

Notifications - There are notifications when users type incorrect data and there is pop-up when user like photo.

Pages:

public part:

- Home page - The main page with some information about the application.
- Login - Users can login if not yet registered they can follow the link to the register page which is located ot login page.
- Register - Users can register and if they have profile they can follow the link to the login page. (Guard redirect to this page if a guest tries to view restricted page)
- Contests - The page with all contests shows list of contests and some information about them.

private part:
- Details - Detailed info about the contest and add photo/participate/ in contest.
- Add photo - Page with simple form with input type url where users can add their photos. After photo publication app redirects to detail page of contest.
- Categories Page - The page with all categories and most popular contests.

Libraries:
- React-router-dom;
- react-cookie;
- react-popup;
- react-datepicker;
- jquery.
