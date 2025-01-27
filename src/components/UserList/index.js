import { Component } from "react";

import "./index.css";

class UserList extends Component {
  state = {
    userList: [],
  };

  componentDidMount() {
    this.getUserList();
  }

  getUserList = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.ok) {
      const data = await response.json();
      this.setState({
        userList: [...data],
      });
    }
  };

  render() {
    const { userList } = this.state;
    return (
      <div className="user-list-container">
        <h1 className="user-list-heading">USER LIST</h1>
        {userList && (
          <div className="user-list-table-container">
            <table className="user-list-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.company.name}</td>
                    <td>
                      <button className="user-list-table-edit-button">
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="user-list-table-delete-button">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default UserList;
