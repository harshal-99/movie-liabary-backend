import jwt from "jsonwebtoken";
import {SECRET} from "./config.js";

export const errorHandler = (error, request, response, next) => {
	console.log(error.message)

	if (error.name === 'ValidationError') {
		return response.status(400).json({error: error.message})
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token'
		})
	}
	next(error)
}

export const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request['token'] = authorization.substring(7)
	}
	next()
}

export const tokenValidator = (request, response, next) => {
	const token = request.token
	if (!token) {
		return response.status(401).json({error: "token missing"})
	}

	const decodedToken = jwt.verify(token, SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({error: "invalid token"})
	}
	next()
}
