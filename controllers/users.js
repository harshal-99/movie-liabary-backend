import bcrypt from "bcrypt";
import {Router} from "express";

import User from "../models/user.js";

const usersRouter = Router()

usersRouter.post('/', async (request, response, next) => {
	const {password, username} = request.body

	if (!password || password.length < 3) {
		return response.status(400).json({error: "password must have length 3"})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		passwordHash
	})

	const savedUser = await user.save()

	response.json(savedUser)
})


export default usersRouter
