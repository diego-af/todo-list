import axios from 'axios';

const getCategories = async () => {
	const response = await axios.get(
		import.meta.env.VITE_REACT_API_URL + '/categories'
	);

	return response.data.data;
};

export {getCategories};
