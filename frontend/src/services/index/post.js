import axios from 'axios';

const domain = 'http://localhost:5000';

export const getAllPosts = async () => {
	try {
		const { data } = await axios.get(`${domain}/api/posts`);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error(error.message);
		}
	}
};
export const getSinglePost = async ({ slug }) => {
	try {
		const { data } = await axios.get(`${domain}/api/posts/${slug}`);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error(error.message);
		}
	}
};
