import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getData = (userId, token) => {
	const url = `${baseUrl}/dashboard/${userId}`;
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.get(url, config);
};

export const topUp = (amount, token) => {
	const url = `${baseUrl}/transaction/top-up`;
	const body = { amount };
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.post(url, body, config);
};

export const transfer = (receiverId, amount, notes, token) => {
	const url = `${baseUrl}/transaction/transfer`;
	const body = { receiverId, amount, notes };
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.post(url, body, config);
};
