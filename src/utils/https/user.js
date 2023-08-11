import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const updatePin = (pin, userId, token, controller) => {
	const url = `${baseUrl}/user/pin/${userId}`;
	const body = { pin };
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.patch(url, body, config);
};

export const checkPin = (pin, token, controller) => {
	const url = `${baseUrl}/user/pin/${pin}`;
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.get(url, config);
};

export const getUsers = (page, limit, search, token, controller) => {
	const url = `${baseUrl}/user?page=${page}&limit=${limit}&search=${search}`;
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.get(url, config);
};

export const getDataById = (userId, token, controller) => {
	const url = `${baseUrl}/user/profile/${userId}`;
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.get(url, config);
};

export const updateName = (body, userId, token, controller) => {
	const url = `${baseUrl}/user/profile/${userId}`;
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.patch(url, body, config);
};

export const updateImage = (body, userId, token, controller) => {
	const url = `${baseUrl}/user/image/${userId}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data"
		},
		signal: controller.signal,
	};
	return axios.patch(url, body, config);
};

export const deleteImage = (userId, token, controller) => {
	const url = `${baseUrl}/user/image/${userId}`;
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.delete(url, config);
};

export const updatePhone = (phoneNumber, userId, token, controller) => {
	const url = `${baseUrl}/user/profile/${userId}`;
	const body = { noTelp: phoneNumber };
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.patch(url, body, config);
};

export const updatePwd = (oldPassword, newPassword, confirmPassword, userId, token, controller) => {
	const url = `${baseUrl}/user/password/${userId}`;
	const body = { oldPassword, newPassword, confirmPassword };
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.patch(url, body, config);
};
