import React, { useState } from "react";

const AddUser = ({ onAddUser }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserEmailChange = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailPattern.test(email);
    setEmailValid(isValid);
  };

  const handleAddUser = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailPattern.test(userEmail);
    setEmailValid(isValid);

    if (userName && userEmail && isValid) {
      onAddUser({ name: userName, email: userEmail });
      setUserName("");
      setUserEmail("");
      setEmailValid(true);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddUser();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-blue-100 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Add User</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={userName}
          onChange={handleUserNameChange}
          className="w-full p-2 border border-blue-500 rounded focus:outline-none focus:border-blue-600"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Email"
          value={userEmail}
          onChange={handleUserEmailChange}
          onKeyPress={handleEnterKeyPress}
          className={`w-full p-2 border rounded focus:outline-none ${
            emailValid ? "border-blue-500" : "border-red-500"
          }`}
        />
        {!emailValid && (
          <p className="text-red-500 text-sm mt-1">Invalid email address</p>
        )}
      </div>
      <button
        onClick={handleAddUser}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Add
      </button>
    </div>
  );
};

export default AddUser;
