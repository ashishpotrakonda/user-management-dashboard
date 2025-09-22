import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import UserTable from "./components/UserTable";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

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
      <UserTable users={users} />
    </>
  );
}

export default App;
