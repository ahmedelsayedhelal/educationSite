// src/Dashboard/DashboardInstructors/api.js
import axios from "axios";

const BASE_URL = "http://educationtraining.runasp.net/api/Instructor";

export const getInstructors = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addInstructor = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateInstructor = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteInstructor = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

export const getInstructorById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};
