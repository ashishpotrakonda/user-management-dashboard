import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import UserTable from "./components/UserTable";
import UserFormModal from "./components/UserFormModal";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isUserFormModalOpen, setIsUserFormModalOpen] = useState(false);

  const addUser = (user) => {
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id, ...user }]);
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
        addUser={addUser}
        onClose={() => setIsUserFormModalOpen(false)}
      />
      {isUserFormModalOpen && (
        <UserFormModal
          addUser={addUser}
          onClose={() => {
            setIsUserFormModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default App;
