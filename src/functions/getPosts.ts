import axios from 'axios';

const getPost = async () => {
	const response = await axios.get(
		import.meta.env.VITE_REACT_API_URL + '/post'
	);

	console.log(response.data.data);
	return response.data.data;
};

export {getPost};
