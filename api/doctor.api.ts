import api from "./api";

export const getDoctorDashboard = async (id: string) => {
  const response = await api.get(`/api/doctors/${id}`);
  return response.data;
};
