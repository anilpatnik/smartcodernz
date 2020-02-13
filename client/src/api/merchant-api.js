import { constants, axios } from "../common";

const urlMerchants = `${constants.API_URL}${constants.MERCHANTS_URL}`;

// find merchant from google place search
export const findMerchants = async item => {
  const response = await axios.post(urlMerchants, item);
  return response.json();
};

// get merchant from google place details
export const getMerchant = async item => {
  const response = await axios.post(`${urlMerchants}/${Math.random()}`, item);
  return response.json();
};
