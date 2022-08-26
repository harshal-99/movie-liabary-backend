import express from "express"
import morgan from "morgan"
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import "express-async-errors"

import {MONGODB_URI} from "./utils/config.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import {errorHandler, tokenExtractor, tokenValidator} from "./utils/middlewar.js";
import playlistRouter from "./controllers/playlist.js";
import searchRouter from "./controllers/search.js";

const app = express()

console.log(`connecting to ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log('connected to mongoDB')
	})
	.catch((error) => {
		console.log('error connecting to mongoDB', error.message)
	})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
	res.redirect('https://github.com/harshal-99/movie-liabary-backend')
})

app.use('/api/signup', usersRouter)
app.use('/api/login', loginRouter)

app.use(tokenExtractor)
app.use(tokenValidator)

app.use('/api/playlist', playlistRouter)
app.use('/api/search', searchRouter)

app.use(errorHandler)

export default app
