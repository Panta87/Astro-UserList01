import React, { useState, useEffect } from "react";
import AddUser from "./AddUser";

const UserList = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/");
      const data = await response.json();

      const filtered = data.filter((user) => {
        const fullName = (user.name + " " + user.email).toLowerCase();
        return fullName.includes(searchText.toLowerCase());
      });

      setFilteredUsers(filtered);
    };

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(performSearch, 250);
    setSearchTimeout(timeoutId);
  }, [searchText]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleAddUser = (newUser) => {
    setFilteredUsers([...filteredUsers, newUser]);
  };

  return (
    <div className="container mx-auto p-5">
    <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-4">User List</h1>
    <input
      type="text"
      placeholder="Search by name, surname, or email"
      className="w-full p-2 mb-4 border border-blue-500 rounded focus:outline-none focus:border-blue-600"
      onChange={handleInputChange}
      value={searchText}
    />
   <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {filteredUsers.map((user) => (
    <a key={user.id} href={`users/${user.id}`}>
      <li className="p-4 rounded-lg border border-blue-500 hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 bg-gradient-to-b from-blue-300 to-blue-400">
        <h2 className="text-xl font-semibold text-blue-900">{user.name}</h2>
        <p className=" font-semibold">{user.email}</p>
      </li>
    </a>
  ))}
</ul>
    <AddUser onAddUser={handleAddUser} />
  </div>
  
  );
};

export default UserList;
