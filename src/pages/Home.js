import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser, loadUsers } from "../redux/action";
import { useHistory } from "react-router-dom";

const Home = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const { users } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user ? ")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <div className="d-grid gap-2 d-md-block" style={{ marginTop: "20px" }}>
        <button
          variant="contained"
          className="btn btn-success me-3"
          type="button"
          onClick={() => history.push("/addUser")}
        >
          ADD USER
        </button>
      </div>
      <table className="table" style={{ marginTop: "80px" }}>
        <thead className="bg-dark">
          <tr>
            <th className="text-light text-center" scope="col">
              Name
            </th>
            <th className="text-light text-center" scope="col">
              Email
            </th>
            <th className="text-light text-center" scope="col">
              Contact
            </th>
            <th className="text-light text-center" scope="col">
              Address
            </th>
            <th className="text-light text-center" scope="col">
              Action
            </th>
          </tr>
        </thead>

        {users &&
          users.map((user) => (
            <tbody
              className="text-center"
              style={{ backgroundColor: "whitesmoke" }}
              key={user.id}
            >
              <tr className="text-center">
                <th>{user.name}</th>
                <th className="text-center">{user.email}</th>
                <th className="text-center">{user.contact}</th>
                <th className="text-center"> {user.address}</th>
                <th className="text-center">
                  <div className="d-grid gap-2 d-md-block">
                    <button
                      className="btn btn-primary me-3"
                      type="button"
                      onClick={() => history.push(`/editUser/${user.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </th>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default Home;
