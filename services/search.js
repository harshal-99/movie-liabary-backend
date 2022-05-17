import axios from "axios"
import {OMDB_API_KEY} from "../utils/config.js";

const baseUrl = 'http://www.omdbapi.com/'

export const searchMovie = async (movieName) => {
	const response = await axios.get(baseUrl, {
		params: {
			's': movieName,
			'apikey': OMDB_API_KEY
		}
	})
	return response.data
}

