import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getData = (userId, token, controller) => {
	const url = `${baseUrl}/dashboard/${userId}`;
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.get(url, config);
};

export const topUp = (amount, token, controller) => {
	const url = `${baseUrl}/transaction/top-up`;
	const body = { amount };
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.post(url, body, config);
};

export const transfer = (receiverId, amount, notes, token, controller) => {
	const url = `${baseUrl}/transaction/transfer`;
	const body = { receiverId, amount, notes };
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.post(url, body, config);
};

export const history = (page, limit, filter, token, controller) => {
	const url = `${baseUrl}/transaction/history?page=${page}&limit=${limit}&filter=${filter}`;
	const config = {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  };
	return axios.get(url, config);
};
