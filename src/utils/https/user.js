import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const updatePin = (pin, userId, token) => {
	const url = `${baseUrl}/user/pin/${userId}`;
	const body = { pin };
	return axios.patch(url, body, { headers: { Authorization: `Bearer ${token}` } });
};

export const getDataById = (userId, token) => {
	const url = `${baseUrl}/user/profile/${userId}`;
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.get(url, config);
};
