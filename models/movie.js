import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
	imdbID: {
		type: String,
		required: true,
	},
})

movieSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Movie = mongoose.model("Movie", movieSchema)

export default Movie
