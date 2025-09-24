import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import UserTable from "./components/UserTable";
import UserFormModal from "./components/UserFormModal";
import Notification from "./components/Notification";

import { BsSearch } from "react-icons/bs";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [isUserFormModalOpen, setIsUserFormModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [visibleUsersCount, setVisibleUsersCount] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

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

  const onSubmitForm = async (user) => {
    if (selectedUser) {
      setIsActionLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          }
        );
        updateUser(user);
        setNotification({
          message: "User updated successfully",
          type: "success",
        });
      } catch (error) {
        setNotification({ message: error.message, type: "error" });
      } finally {
        setIsActionLoading(false);
      }
    } else {
      setIsActionLoading(true);
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
          setNotification({
            message: "User added successfully",
            type: "success",
          });
        } else {
          throw new Error("Failed to add user");
        }
      } catch (error) {
        setNotification({ message: error.message, type: "error" });
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  const deleteUser = async (id) => {
    setIsActionLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        setNotification({
          message: "User deleted successfully",
          type: "success",
        });
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setIsActionLoading(false);
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

  const visibleUsers = sortedUsers.slice(0, visibleUsersCount);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to retrieve users");
        }
        const data = await response.json();
        const users = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          company: user.company.name,
        }));
        setUsers(users);
      } catch (error) {
        setRequestError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;
      if (bottom && visibleUsersCount < sortedUsers.length) {
        setVisibleUsersCount((prev) => prev + 25);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleUsersCount, sortedUsers.length]);

  return (
    <>
      <Navbar />
      <div className="m-4 flex flex-wrap justify-between items-center gap-3">
        <button
          onClick={() => setIsUserFormModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add New User
        </button>
        <div className="flex flex-wrap gap-2">
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
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : requestError ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-600 text-2xl font-medium">{requestError}</p>
        </div>
      ) : visibleUsers.length === 0 ? (
        <p className="text-2xl text-center text-gray-500 py-4">
          No users found
        </p>
      ) : (
        <UserTable
          users={visibleUsers}
          setSelectedUser={setSelectedUser}
          setIsUserFormModalOpen={setIsUserFormModalOpen}
          deleteUser={deleteUser}
        />
      )}
      {isUserFormModalOpen && (
        <UserFormModal
          selectedUser={selectedUser}
          onSubmitForm={onSubmitForm}
          onClose={() => {
            setIsUserFormModalOpen(false);
          }}
        />
      )}
      {isActionLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </>
  );
}

export default App;
