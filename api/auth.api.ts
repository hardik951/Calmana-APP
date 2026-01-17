import axios from "axios";

const BASE_URL = "http://172.20.10.5:5000";

export const loginOrSignup = async (
  email: string,
  password: string,
  role: "patient" | "doctor"
) => {
  const res = await axios.post(`${BASE_URL}/api/users/auth/login`, {
    email,
    password,
    role,
  });

  return res.data;
};
