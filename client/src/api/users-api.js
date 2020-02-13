import { constants, axios } from "../common";

const urlUsers = `${constants.API_URL}${constants.USERS_URL}`;

// get data from firebase
export const getUsers = async () => {
  const response = await axios.get(urlUsers);
  return response.json();
};

// add or update data to firebase
export const submitCategory = async item => {
  const response = await axios.post(urlUsers, item);
  return response.json();
};

// delete data from firebase
export const deleteCategory = async item => {
  const response = await axios.delele(`${urlUsers}/${item}`);
  return response.json();
};
