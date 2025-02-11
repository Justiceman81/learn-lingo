# LearnLingo - Online Language Tutor Application

## Project Description

LearnLingo is a web application designed to connect students with online language tutors. The platform offers a user-friendly interface with features for browsing tutors, filtering by criteria, adding favorites, and booking trial lessons.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Firebase (Authentication, Realtime Database)
- **Form Validation**: react-hook-form, yup
- **Routing**: React Router

## Features

1.  **Home Page**:

    - Showcases company benefits and a call-to-action button linking to the "Teachers" page.
    - Customizable styling based on provided mockup or unique design.

2.  **Teachers Page**:

    - Displays a list of language tutors.
    - Filtering by language, student level, and price per hour.

3.  **Favorites Page (Private)**:

    - Accessible only to logged-in users.
    - Displays a list of favorite tutors.
    - Styling consistent with the "Teachers" page.

4.  **Authentication**:
    - Firebase Authentication for registration, login, logout.
    - Form validation with react-hook-form & yup (all fields required).
    - Modal for registration/login with close options (cross, backdrop click, Esc key).

## Firebase Database Structure

- **Teachers Collection**:
  - Fields: name, surname, languages, levels, rating, reviews, price_per_hour, lessons_done, avatar_url, lesson_info, conditions, experience.

## Implementation Details

- Responsive design for desktop (based on mockup).
- Clean and valid code (no browser console errors).
- Interactive elements working according to the specifications.
- Well-formatted code with minimal comments.

## Project Setup

1.  Clone the repository: `git clone https://github.com/Justiceman81/learn-lingo`
2.  Install dependencies: `npm install`
3.  Run the development server: `npm start`

## Deployment

The project is deployed on [GitHub Pages/Netlify/other hosting platform].

## Contact

For any questions or suggestions, please contact us at: justiceman814@gmail.com

## Mockup

https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0

## Technical Specification

https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?tab=t.0
