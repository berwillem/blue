import axiosInstance from "./axiosInstance";

/* ===== Form Stats ===== */

export const incrementB2B = () => axiosInstance.post("/stats/b2b");

export const incrementB2C = () => axiosInstance.post("/stats/b2c");

export const incrementJoinUs = () => axiosInstance.post("/stats/join");

export const getFormStats = () => axiosInstance.get("/stats");

/* ===== B2B Detail ===== */

export const saveB2BDetail = (data) =>
  axiosInstance.post("/stats/b2b-detail", data);

export const getB2BStats = () => axiosInstance.get("/stats/b2b-detail");

/* ===== Join Us Detail ===== */

export const saveJoinUsDetail = (data) =>
  axiosInstance.post("/stats/joinus-detail", data);

export const getJoinUsStats = () => axiosInstance.get("/stats/joinus-detail");

/* ===== Tests ===== */

export const recordTest = (data) => {
  console.log("Recording test with data:", data);
  return axiosInstance.post("/tests", data);
};

export const getTestStats = () => axiosInstance.get("/tests/stats");

export const getPersonalAverages = () =>
  axiosInstance.get("/tests/personal/averages");
