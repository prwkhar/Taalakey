import React, { useEffect, useState } from "react";
import { useMemo } from "react";

const Manager = () => {
  const [form, setForm] = useState({
    url: "",
    username: "",
    password: "",
    showpassword: false,
  });

  const [passwordArray, setPasswordArray] = useState([]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await fetch("http://localhost:3000/");

        if (!response.ok) throw new Error("Failed to fetch passwords");

        const passy = await response.json();
        setPasswordArray(passy);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    fetchPasswords();
  }, []);

  const savePass = async () => {
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setPasswordArray([...passwordArray, form]);
      console.log("password saved");
    } else {
      console.log("password not saved");
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

  const deletepass = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json(); 
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete password");
      }
      console.log("Success:", data.message);
    } catch (error) {
      console.error("Error deleting password:", error.message);
    }
  };
  return (
    <>
      <div>
        <div className="fixed top-0 z-[-2] min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="mx-30 my-16 bg-amber-700/50 p-2 rounded-2xl flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center z-10">
          <span>&lt;Taala</span>
          <span className="text-green-600">Key</span>
          <span>/&gt;</span>
        </h1>

        <div className="font-doto text-center text-white font-semibold">
          Your own password Manager
        </div>

        <div className="flex flex-col space-y-2 p-2 w-full mx-2 opacity-100">
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

        <button
          onClick={savePass}
          className="bg-blue-950 rounded-2xl py-1 px-4 text-white  hover:bg-blue-800"
        >
          <h1>Save Password</h1>
        </button>
        <div className="mt-5 bg-amber-400 w-full rounded-2xl p-3 flex flex-col">
          <div className="text-xl font-bold">Your Passwords</div>
          <div className="overflow-x-scroll">
            {passwordArray.length != 0 ? (
              <div>
                <div className="flex flex-col">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Url</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passwordArray.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.url}</td>
                            <td>{item.username}</td>
                            <td>{item.password}</td>
                            <td className="flex justify-center" >
                              <lord-icon
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  cursor: "pointer",
                                }}
                              ></lord-icon>
                              <lord-icon
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover"
                                style={{width:"25px",height:"25px"}}
                                onClick={()=>deletepass(passwordArray._id)}
                              ></lord-icon>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <h1>No passwords to show</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
