import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import UserTable from "./components/UserTable";
import UserFormModal from "./components/UserFormModal";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isUserFormModalOpen, setIsUserFormModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const addUser = (user) => {
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { ...user, id }]);
  };

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const onSubmitForm = async (user) => {
    if (selectedUser) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          }
        );
        if (response.ok) {
          updateUser(user);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          }
        );
        if (response.ok) {
          addUser(user);
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const users = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          company: user.company.name,
        }));
        setUsers(users);
      });
  }, []);

  return (
    <>
      <Navbar />
      <button
        onClick={() => setIsUserFormModalOpen(true)}
        className="px-4 py-2 mt-4 ml-4 bg-indigo-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Add New User
      </button>
      <UserTable
        users={users}
        setSelectedUser={setSelectedUser}
        setIsUserFormModalOpen={setIsUserFormModalOpen}
        deleteUser={deleteUser}
      />
      {isUserFormModalOpen && (
        <UserFormModal
          selectedUser={selectedUser}
          onSubmitForm={onSubmitForm}
          onClose={() => {
            setIsUserFormModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default App;
