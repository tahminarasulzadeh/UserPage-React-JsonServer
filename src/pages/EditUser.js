import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  editUser, updateUser } from "../redux/action";


const EditUser = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");
  let { id } = useParams();
  const { user } = useSelector((state) => state.data);
  let history = useHistory();
  let dispatch = useDispatch();

  const { name, email, contact, address } = state;

  useEffect(() => {
    dispatch(editUser(id));
  }, []);

  useEffect(() => {
  if(user){
 setState({...user})
  }
  }, [user])

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !email || !contact) {
      setError("Please input all the input field");
    } else {
      dispatch(updateUser(state, id));
      history.push("/");
      setError("");
    }
  };

  return (
    <div>
      <button
        style={{ width: "150px", height: "40px", fontSize: "15px" }}
        variant="contained"
        className="btn btn-danger me-3 mt-3"
        onClick={() => history.push("/")}
      >
        Go Back
      </button>
      <h2 className="mt-3">Edit User</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Name"
          value={name || ""}  
          type="text"
          variant="standard"
          name="name"
          className="mt-3 form-control"
          onChange={handleInputChange}
          style={{ width: "500px" }}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Email"
          value={email || ""}
          type="email"
          variant="standard"
          name="email"
          className="mt-3 form-control"
          onChange={handleInputChange}
          style={{ width: "500px" }}
        />
        <br />

        <TextField
          id="standard-basic"
          label="Contact"
          value={contact || ""}
          type="number"
          name="contact"
          variant="standard"
          className="mt-3 form-control"
          onChange={handleInputChange}
          style={{ width: "500px" }}
        />
        <br />

        <TextField
          id="standard-basic"
          label="Address"
          value={address || ""}
          type="text"
          name="address"
          variant="standard"
          className="mt-3 form-control"
          onChange={handleInputChange}
          style={{ width: "500px" }}
        />
        <br />
        <button
          style={{ width: "150px", height: "40px", fontSize: "15px" }}
          variant="contained"
          className="btn btn-success me-3 mt-3 form-control"
          type="submit"
          onClick={handleInputChange}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
