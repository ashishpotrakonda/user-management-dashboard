import { Component } from "react";

import "./index.css";

class UserList extends Component {
  render() {
    const { userList, loadUserDetailsForEdit, deleteUser } = this.props;

    return (
      <div className="user-list-container">
        <h1 className="user-list-heading">USER LIST</h1>
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
                  <td>{user.company}</td>
                  <td>
                    <button
                      className="user-list-table-edit-button"
                      onClick={() => {
                        loadUserDetailsForEdit(user.id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="user-list-table-delete-button"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserList;
