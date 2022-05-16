import {Router} from "express";
import {SECRET} from "../utils/config.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Movie from "../models/movie.js";
import Playlist from "../models/playlist.js";

const playlistRouter = Router()

playlistRouter.get('/:id', async (request, response, next) => {
	const id = request.params.id
	const token = request.token

	const decodedToken = jwt.verify(token, SECRET)

	const playlist = await Playlist.findById(id).populate('movies')

	if (!playlist) {
		return response.status(400).json({error: 'Playlist dose not exists'})
	}

	if (!playlist.private) {
		return response.json(playlist.toJSON())
	} else if (playlist.private && playlist.creator.toString() === decodedToken.id) {
		return response.json(playlist.toJSON())
	}
	response.status(401).json({error: 'Playlist not found'})
})

playlistRouter.post('/', async (request, response, next) => {
	const playlist = request.body.playlist

	const token = request.token

	const decodedToken = jwt.verify(token, SECRET)

	const user = await User.findById(decodedToken.id)

	let movies = []
	for (let movie of playlist.movies) {
		movies.push(new Movie({imdbID: movie.imdbID}))
	}
	for (let movie of movies) {
		movie = await movie.save()
	}

	// console.log(user.id)

	const newPlaylist = new Playlist({
		private: playlist.private,
		creator: user.id,
		movies: movies.map(movie => movie.id)
	})

	const savedPlaylist = await newPlaylist.save()
	const result = await User.findByIdAndUpdate(user.id, {"$push": {"playlist": savedPlaylist}})

	response.send(savedPlaylist.toJSON())
})

export default playlistRouter