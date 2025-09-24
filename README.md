```
# User Management Dashboard

A React-based user management dashboard built with Vite + React + TailwindCSS.
The project demonstrates CRUD operations, searching, sorting, filtering, and infinite scrolling using the JSONPlaceholder API.

---

## Project Overview
This application allows users to:
- View a list of users
- Add, edit, and delete users
- Search and filter users by different fields
- Sort data by ID, Name, Email, or Company
- Scroll infinitely to load more data dynamically
- Handle form validation with user-friendly error messages

Note: JSONPlaceholder simulates API success but does not persist data permanently.

---

## Setup Instructions

1. Clone the repository:
   git clone https://github.com/ashishpotrakonda/user-management-dashboard.git
   cd user-management-dashboard

2. Install dependencies:
   npm install

---

## Run Instructions

Start the development server:
   npm run dev

Then open in your browser:
   http://localhost:5173

Build for production:
   npm run build
   npm run preview

---

## Tech Stack
- React (with Vite)
- TailwindCSS

---

## Features Implemented
- Responsive user table
- Add/Edit/Delete user with modals
- Client-side search, filter, and sorting
- Infinite scrolling for large datasets
- Basic validation for empty form fields

---

## Reflections

### Challenges Faced
- Asynchronous API calls: Handling mock responses from JSONPlaceholder which don’t persist data.
- Infinite scrolling logic: Detecting when the user reaches the bottom of the page and dynamically loading more rows.
- Responsive layout: Ensuring buttons and input fields do not overlap on smaller screens.

### Improvements
If given more time, I would:
- Implement a real backend for persistent CRUD operations.
- Add more robust form validation with error messages per field.
- Improve UI/UX with a design system.
- Add authentication for secure user management.

---

## Deployed Link
Live Demo: https://user-management-dashboard-1y89.vercel.app/
```
