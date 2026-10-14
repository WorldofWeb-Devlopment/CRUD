import React, { useState } from "react";
import "./App.css";
import Users from "./Users";

function App() {
  const [item, setItem] = useState(Users);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [role, setRole] = useState([]);
  const[isDisabled,setIsDisabled] = useState(true)

  function handledelete(id) {
    setItem((item) => item.filter((item) => item.id !== id));
  }
  function handletodo() {
    const Todos = {
      id: Date.now(),
      name,
      email,
      role,
    };

    setItem((prevItem) => [...prevItem, Todos]);
    setName("");
    setEmail("");
    setRole("");
  }

  function handleupdate(id) {
    const selectdUser = item.find((item) => item.id === id);
    setEditName(selectdUser.name);
    console.log(selectdUser);
    // setItem((prevItem)=>prevItem.map((user)=>user.id === editingId ? {...user,name}:user))
    setEditingId(id);
    setIsDisabled(id)
     
  }
  function handlesave() {
  
    setItem((prevItem) =>
      prevItem.map((user) =>
        user.id === editingId ? { ...user, name: editName } : user,
      ),
    );
    setEditingId(null);
    setIsDisabled(true)
  }

  return (
    <div className="container">
      <h1>Users List</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </thead>
        <tbody>
          {item.map((item) => (
            <tr key={item.id}>
              {editingId === item.id ? (
                <td>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </td>
              ) : (
                <td>{item.name}</td>
              )}
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <button onClick={() => handleupdate(item.id)}>Update</button>
                <button onClick={() => handledelete(item.id)}>Delete</button>
                <button onClick={handlesave} disabled={isDisabled !== item.id}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="input-field">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Role</label>
        <input
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={handletodo}>Add</button>
      </div>
    </div>
  );
}

export default App;
