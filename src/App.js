import { Component } from "react";

import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ErrorBoundary from "./components/ErrorBoundary";

import "./App.css";

class App extends Component {
  state = {
    userList: [],
    showUserForm: false,
    selectedUserDetails: {
      id: "",
      name: "",
      email: "",
      company: "",
    },
    errorMessage: "",
  };

  componentDidMount() {
    this.getUserList();
  }

  getUserList = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({
          userList: data.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company.name,
          })),
        });
      } else {
        throw new Error(`Error : ${response.status}`);
      }
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  loadUserDetailsForEdit = (id) => {
    const { userList } = this.state;
    const selectedUserDetails = userList.find((user) => user.id === id);
    const { name, email, company } = selectedUserDetails;
    this.setState({
      selectedUserDetails: {
        id,
        name,
        email,
        company,
      },
      showUserForm: true,
    });
  };

  updateUserDetails = async (updatedUserDetails) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedUserDetails.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserDetails),
        }
      );
      if (response.ok) {
        this.setState((prevState) => ({
          userList: prevState.userList.map((userDetails) => {
            if (userDetails.id === updatedUserDetails.id) {
              return { ...updatedUserDetails };
            }
            return userDetails;
          }),
          selectedUserDetails: {
            id: "",
            name: "",
            email: "",
            company: "",
          },
          showUserForm: false,
        }));
      } else {
        throw new Error(`Error : ${response.status}`);
      }
    } catch (error) {
      this.setState({ errorMessage: error.message, showUserForm: false });
    }
  };

  deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        this.setState((prevState) => ({
          userList: prevState.userList.filter((user) => user.id !== id),
        }));
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }
  };

  onClickAddUserButton = () => {
    this.setState({
      showUserForm: true,
    });
  };

  addUser = async (userDetails) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userDetails.name,
            email: userDetails.email,
            company: userDetails.company,
          }),
        }
      );
      if (response.ok) {
        this.setState((prevState) => ({
          userList: [
            ...prevState.userList,
            {
              id: prevState.userList.length + 1,
              name: userDetails.name,
              email: userDetails.email,
              company: userDetails.company,
            },
          ],
          showUserForm: false,
        }));
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        showUserForm: false,
      });
    }
  };

  render() {
    const { userList, showUserForm, selectedUserDetails, errorMessage } =
      this.state;
    if (errorMessage !== "") {
      return <h1>{errorMessage}</h1>;
    }
    return (
      <div className="app-container">
        <ErrorBoundary>
          <h1 className="app-heading">USER MANAGEMENT DASHBOARD</h1>

          {userList.length !== 0 && (
            <ErrorBoundary>
              <UserList
                userList={userList}
                loadUserDetailsForEdit={this.loadUserDetailsForEdit}
                deleteUser={this.deleteUser}
              />
            </ErrorBoundary>
          )}
          <UserForm
            showUserForm={showUserForm}
            selectedUserDetails={selectedUserDetails}
            updateUserDetails={this.updateUserDetails}
            addUser={this.addUser}
          />
          <button className="app-button" onClick={this.onClickAddUserButton}>
            Add User
          </button>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
