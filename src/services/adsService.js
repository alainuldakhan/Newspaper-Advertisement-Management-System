import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1`;

function createAd(formData) {
  return axios.post(
    `${BASE_URL}/ads`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
}

function getAds() {
  return axios.get(`${BASE_URL}/ads`);
}


function getMyAds() {
  return axios.get(`${BASE_URL}/ads/mine`);
}


function getAd(id) {
  return axios.get(`${BASE_URL}/ads/${id}`);
}


function updateAd(id, data) {
  return axios.put(`${BASE_URL}/ads/${id}`, data);
}


function deleteAd(id) {
  return axios.delete(`${BASE_URL}/ads/${id}`);
}

export default {
  createAd,
  getAds,
  getMyAds,
  getAd,
  updateAd,
  deleteAd,
};
