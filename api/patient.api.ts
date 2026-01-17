import axios from "axios";

const BASE_URL = "http://172.20.10.5:5000";   // your local IP

export const getPatientDashboard = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.log("API ERROR:", error.message);
    throw error;
  }
};
