import { constants, axios } from "../common";

const urlCategories = `${constants.API_URL}${constants.CATEGORIES_URL}`;

// get data from firebase
export const getCategories = async () => {
  const response = await axios.get(urlCategories);
  return response.json();
};

// add or update data to firebase
export const submitCategory = async item => {
  const response = await axios.post(urlCategories, item);
  return response.json();
};

// delete data from firebase
export const deleteCategory = async item => {
  const response = await axios.delele(`${urlCategories}/${item}`);
  return response.json();
};
