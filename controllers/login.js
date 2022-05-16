import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {Router} from "express";
import User from "../models/user.js";
import {SECRET} from "../utils/config.js";

const loginRouter = Router()

loginRouter.post('/', async (request, response, next) => {
	const body = request.body

	const user = await User.findOne({username: body.username})
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(body.password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id
	}

	const token = jwt.sign(userForToken, SECRET)

	response
		.status(200)
		.send({token, username: user.username, name: user.name})
})

export default loginRouter
