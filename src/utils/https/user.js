import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const updatePin = (pin, userId, token) => {
	const url = `${baseUrl}/user/pin/${userId}`;
	const body = { pin };
	return axios.patch(url, body, { headers: { Authorization: `Bearer ${token}` } });
};

export const checkPin = (pin, token) => {
	const url = `${baseUrl}/user/pin/${pin}`;
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.get(url, config)
};

export const getDataById = (userId, token) => {
	const url = `${baseUrl}/user/profile/${userId}`;
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.get(url, config);
};

export const updateName = (body, userId, token) => {
	const url = `${baseUrl}/user/profile/${userId}`;
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.patch(url, body, config);
};

export const updateImage = (body, userId, token) => {
	const url = `${baseUrl}/user/image/${userId}`;
	const config = {
		headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
	};
	return axios.patch(url, body, config);
};

export const deleteImage = (userId, token) => {
	const url = `${baseUrl}/user/image/${userId}`;
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.delete(url, config);
};

export const updatePhone = (phoneNumber, userId, token) => {
	const url = `${baseUrl}/user/profile/${userId}`;
	const body = { noTelp: phoneNumber };
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.patch(url, body, config);
};

export const updatePwd = (oldPassword, newPassword, confirmPassword, userId, token) => {
	const url = `${baseUrl}/user/password/${userId}`;
	const body = { oldPassword, newPassword, confirmPassword };
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.patch(url, body, config);
};
