import apiClient from "../config/api-client";
import { loginAPI } from "../constants/loginApi";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
      phone?: string;
      role: string;
      is_active: boolean;
    };
  };
  message: string;
  status: number;
}

//untuk login
export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(loginAPI.login, payload);
  return response.data;
};
