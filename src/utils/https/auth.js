import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

export const signup = (body) => {
	const url = `${baseUrl}/auth/register`;
	return axios.post(url, body);
};

export const login = (body) => {
	const url = `${baseUrl}/auth/login`;
	return axios.post(url, body);
};

export const forgotPwd = (email) => {
	const url = `${baseUrl}/auth/forgot-password`;
	const body = {
		email,
		linkDirect: `${hostUrl}/resetpwd`,
	};
	return axios.post(url, body);
};

export const resetPwd = (keysChangePassword, newPassword, confirmPassword) => {
	const url = `${baseUrl}/auth/reset-password`;
	const body = {
		keysChangePassword,
		newPassword,
		confirmPassword,
	};
	return axios.patch(url, body);
};
