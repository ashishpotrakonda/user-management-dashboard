import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import UserTable from "./components/UserTable";
import UserFormModal from "./components/UserFormModal";

import { BsSearch } from "react-icons/bs";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isUserFormModalOpen, setIsUserFormModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [filterKey, setFilterKey] = useState("");

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

  const filteredUsers = users.filter((user) => {
    if (!filterKey) {
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return user[filterKey].toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortKey) return 0;
    return a[sortKey].localeCompare(b[sortKey]);
  });

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
      <div className="m-4 flex justify-between items-center">
        <button
          onClick={() => setIsUserFormModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add New User
        </button>
        <div className="flex gap-2">
          <div className="relative flex">
            <BsSearch className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-3 py-1.5 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
            className="border px-2 py-1.5 rounded"
          >
            <option value="">Filter</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
          </select>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="border px-2 py-1.5 rounded"
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="company">Company</option>
          </select>
        </div>
      </div>
      <UserTable
        users={sortedUsers}
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
