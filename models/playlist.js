import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
	private: {
		type: Boolean,
		required: true
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	movies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Movie"
		}
	]
})

playlistSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Playlist = mongoose.model("Playlist", playlistSchema)

export default Playlist
