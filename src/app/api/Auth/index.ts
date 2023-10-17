import { API_URL } from "@/utils";
import axios from "axios";


export const register = async (data: any) => axios.post(`${API_URL}/publishers/register`, data);
export const login = async (data: any) => axios.post(`${API_URL}/publishers/login`, data);

export const googleLogin = (access_token: string) => axios.post(`${API_URL}/publishers/google-login`, { access_token });

export const getProfile = async () => axios.get(`${API_URL}/profile`);
export const createPin = async (pin: string, pin_confirmation: string) => axios.post(`${API_URL}/pin`, { pin, pin_confirmation });
export const verifyUser = async (data: any) => axios.put(`${API_URL}/verify-user`, data);
export const resendUserOTP = async (data: any) => axios.post(`${API_URL}/register`, data);
export const forgotPassword = async (data: any) => axios.post(`${API_URL}/publishers/forgot-password`, data);
export const verifyEmail = async (token: string) => axios.put(`${API_URL}/publishers/verify`, { token });

export const resetPassword = async (data: any) => axios.put(`${API_URL}/publishers/reset-password`, data);
export const changePassword = async (data: any) => axios.put(`${API_URL}/change-password`, data);
export const changePin = async (data: any) => axios.put(`${API_URL}/pin`, data);


export const confirmBVN = async (data: any) => axios.post(`${API_URL}/confirm-bvn`, data);
export const confirmBVNImage = async (data: any) => axios.post(`${API_URL}/confirm-bvn-image`, data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
export const verifyBVN = async (data: any) => axios.put(`${API_URL}/verify-bvn`, data);

export const verifyUserOTP = async (phone: string) => axios.post(`${API_URL}/verify-user`, { phone });
export const resendBVNOTP = async (bvn: string) => axios.post(`${API_URL}/resend-bvn-otp`, { bvn });

export const registerAgent = async (data: any) => axios.post(`${API_URL}/resend-user-otp`, data);

