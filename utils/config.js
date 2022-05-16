import dotenv from "dotenv"

dotenv.config()

export const MONGODB_URI = process.env.NODE_ENV === 'test'
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI

export const PORT = process.env.PORT ? process.env.PORT : 3000

export const SECRET = process.env.SECRET ? process.env.SECRET : "my_secret"

export const OMDB_API_KEY = process.env.OMDB_KEY
