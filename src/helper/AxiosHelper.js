import Axios from 'axios';
import { API_URL } from '@env';

const AxiosInstance = Axios.create({
	baseURL: API_URL,
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json'
	}
});

export default AxiosInstance;