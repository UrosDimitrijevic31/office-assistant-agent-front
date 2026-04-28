import axios from "axios";
import type { RegisterFormValues } from "./register-schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(data: RegisterFormValues) {
  const response = await axios.post(
    `${API_URL}/api/auth/sign-up/email`,
    {
      name: data.name,
      email: data.email,
      password: data.password,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
}
