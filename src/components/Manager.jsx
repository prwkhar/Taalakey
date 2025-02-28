import React, { useEffect, useState } from "react";

const Manager = () => {
  const [form, setForm] = useState({
    url: "",
    username: "",
    password: "",
    showpassword: false,
  });

  const [passwordArray, setPasswordArray] = useState([]);
  const [editId, setEditId] = useState(null);

  // Load passwords from localStorage on first render
  useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswordArray(savedPasswords);
  }, []);

  // Save passwords to localStorage whenever passwordArray changes
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwordArray));
  }, [passwordArray]);

  const savePass = () => {
    if (editId) {
      // Update existing password
      const updatedPasswords = passwordArray.map((item) =>
        item.id === editId ? { ...form, id: editId } : item
      );
      setPasswordArray(updatedPasswords);
      setEditId(null);
    } else {
      // Save new password
      const newPass = { ...form, id: Date.now() };
      setPasswordArray([...passwordArray, newPass]);
    }

    setForm({ url: "", username: "", password: "", showpassword: false });
  };

  const deletePass = (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const editPass = (id) => {
    const selectedPass = passwordArray.find((item) => item.id === id);
    if (selectedPass) {
      setForm(selectedPass);
      setEditId(id);
    }
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onShowClick = () => {
    setForm((prevForm) => ({
      ...prevForm,
      showpassword: !prevForm.showpassword,
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <>
      {/* Background */}
      <div className="fixed top-0 z-[-2] min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

      <div className="mx-30 my-16 bg-amber-700/50 p-4 rounded-2xl flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center">
          <span>&lt;Taala</span>
          <span className="text-green-600">Key</span>
          <span>/&gt;</span>
        </h1>

        <div className="font-doto text-center text-white font-semibold">
          Your own password Manager
        </div>

        {/* Input Fields */}
        <div className="flex flex-col space-y-2 p-2 w-full">
          <input
            type="text"
            name="url"
            placeholder="Enter website URL"
            onChange={changeHandler}
            value={form.url}
            className="bg-amber-500 rounded-2xl p-1"
          />
          <div className="flex justify-between space-x-2">
            <input
              placeholder="Enter Username"
              name="username"
              value={form.username}
              type="text"
              onChange={changeHandler}
              className="bg-amber-500 rounded-2xl w-1/2 p-1"
            />
            <div className="w-1/2 flex space-x-1">
              <input
                value={form.password}
                name="password"
                placeholder="Enter Password"
                onChange={changeHandler}
                type={form.showpassword ? "text" : "password"}
                className="bg-amber-500 rounded-2xl w-full p-1"
              />
              <button
                className="bg-blue-400 rounded-2xl border-2 p-2 hover:bg-blue-700"
                onClick={onShowClick}
              >
                Show
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={savePass}
          className="bg-blue-950 rounded-2xl py-1 px-4 text-white hover:bg-blue-800"
        >
          <h1>{editId ? "Update Password" : "Save Password"}</h1>
        </button>

        {/* Password List */}
        <div className="mt-5 bg-amber-400 w-full rounded-2xl p-3 flex flex-col">
          <div className="text-xl font-bold">Your Passwords</div>
          {passwordArray.length !== 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Url</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>
                      <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer">
                        {item.url}
                      </a>
                    </td>
                    <td>
                      {item.username}
                      <button
                        className="ml-2 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
                        onClick={() => copyToClipboard(item.username)}
                      >
                        Copy
                      </button>
                    </td>
                    <td>
                      {item.password}
                      <button
                        className="ml-2 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
                        onClick={() => copyToClipboard(item.password)}
                      >
                        Copy
                      </button>
                    </td>
                    <td className="flex space-x-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => editPass(item.id)}
                        className="bg-green-500 px-2 py-1 rounded text-white hover:bg-green-700"
                      >
                        Edit
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => deletePass(item.id)}
                        className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No passwords saved</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
