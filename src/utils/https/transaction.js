import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getData = (userId, token) => {
	const url = `${baseUrl}/dashboard/${userId}`;
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return axios.get(url, config);
};
