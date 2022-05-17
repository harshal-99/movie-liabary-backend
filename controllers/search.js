import {Router} from "express";
import {searchMovie} from "../services/search.js";

const searchRouter = Router()

searchRouter.get('/', async (request, response, next) => {
	if(!request.query.s) {
		return response.sendStatus(400)
	}
	const result = await searchMovie(request.query.s)
	console.log(result)
	if(result.Response === 'True') {
		return response.json(result.Search)
	} else {
		return response.json({error: result.Error})
	}
})

export default searchRouter
