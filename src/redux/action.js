import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDelete = () => ({
  type: types.DELETE_USER,
});

const userAdd = () => ({
  type: types.ADD_USER,
});

const userUpdate = () => ({
  type: types.UPDATE_USER,
});

const editAdd = (user) => ({
  type: types.EDIT_USER,
  payload: user,
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((response) => {
        console.log("response", response);
        dispatch(getUsers(response.data));
      })
      .catch((error) => console.log("error", error));
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((response) => {
        console.log("response", response);
        dispatch(userDelete());
        dispatch(loadUsers());
      })
      .catch((error) => console.log("error", error));
  };
};
export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, user)
      .then((response) => {
        console.log("response", response);
        dispatch(userAdd());
        // dispatch(loadUsers());
      })
      .catch((error) => console.log("error", error));
  };
};

export const editUser = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((response) => {
        console.log("response", response);
        dispatch(editAdd(response.data));
        // dispatch(loadUsers());
      })
      .catch((error) => console.log("error", error));
  };
};


export const updateUser = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, user )
      .then((response) => {
        console.log("response", response);
        dispatch(userUpdate());
        // dispatch(loadUsers());
      })
      .catch((error) => console.log("error", error));
  };
};