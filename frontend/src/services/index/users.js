import axios from 'axios';

const domain = 'http://localhost:5000';
export const signUp = async ({ name, email, password }) => {
	try {
		const { data } = await axios.post(`${domain}/api/users/register`, {
			name,
			email,
			password,
		});
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error(error.message);
		}
	}
};
