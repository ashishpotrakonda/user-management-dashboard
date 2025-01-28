# User Management Dashboard

A simple React-based User Management Dashboard application for managing users, including features to view, add, update, and delete users.

---

## Features

- Display a list of users with a responsive table.
- Add new users via a form with input validation.
- Edit and update existing user details.
- Delete users with confirmation.
- Error handling using an ErrorBoundary component.
- Uses JSONPlaceholder as a mock API.

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [Git](https://git-scm.com/)
- Code editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/ashishpotrakonda/user-management-dashboard.git

# Navigate to the project directory
cd user-management-dashboard

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

### Usage

- **View Users**: The dashboard displays a list of users fetched from the JSONPlaceholder API.
- **Add Users**: Use the form to add new users with valid inputs.
- **Update Users**: Edit user details by selecting a user.
- **Delete Users**: Remove a user from the list.

## Project Structure

/src
├── components
│ ├── UserList.js # Component to display the user list
│ ├── UserForm.js # Component for adding/updating users
│ ├── ErrorBoundary.js # Error boundary to catch runtime errors
│
├── App.js # Main application component
├── index.js # Entry point for React

## Technologies Used

- **React**: Component-based UI library.
- **JSONPlaceholder**: Mock API for data fetching.
- **CSS**: Styling for the application.

## Challenges Faced and Potential Improvements

### Challenges Faced

1. **State Management for User Forms**:

   - Managing form state for adding and updating users was initially cumbersome. Ensuring that the form inputs are properly cleared after submission, and handling both create and update operations in a unified way, created some confusion.
   - Solution: Leveraged conditional rendering for form submissions (Add/Update) and cleared the form state after successful actions to reset it.

2. **Handling Modal State and Visibility**:

   - The modal component for adding and updating users required careful state management to handle opening, closing, and resetting the form when a user was selected or when a new user was added.
   - Solution: Used React's internal state (`modalIsOpen`) to control modal visibility, along with form state management for input fields.

3. **User Interface Responsiveness**:
   - Initially, the UI was not responsive, and it wasn't adjusting well to different screen sizes. The layout for user lists and form components could break on smaller devices.
   - Solution: Introduced basic responsive design using CSS media queries to improve the app's mobile-friendliness.

### Potential Improvements

1. **Improve Styling and UI Design**:

   - While functional, the application's styling could be improved for better user experience. The current UI could use more visual feedback for user interactions (e.g., loading spinners, hover effects, and improved button styles).
   - Solution: Invest time in improving the design, possibly using CSS frameworks like **Bootstrap** or **Material-UI**, or custom CSS for a more polished look.

2. **User Authentication**:

   - Currently, the app doesn't support user authentication. Allowing users to log in and manage their data could be a valuable addition, especially if the app expands into more complex functionality.
   - Solution: Implement authentication (e.g., using **JWT** tokens or OAuth2) to allow users to create accounts and securely manage their data.

3. **Error Boundaries and Handling Enhancements**:
   - While `ErrorBoundary` is used to catch runtime errors, it could be expanded to handle more specific edge cases (like form validation errors and failed API requests) and provide more detailed feedback to the user.
   - Solution: Add more comprehensive error handling for user input validation and API response errors to improve the user experience.
