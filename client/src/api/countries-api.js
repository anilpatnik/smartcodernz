import { constants, axios } from "../common";

const urlCountries = `${constants.API_URL}${constants.LOOKUP_URL}${constants.COUNTRIES_URL}`;

// get data from firebase
export const getCountries = async () => {
  const response = await axios.get(urlCountries);
  return response.json();
};

// add or update data to firebase
export const loadCountries = async () => {
  const response = await axios.post(urlCountries);
  return response.json();
};
