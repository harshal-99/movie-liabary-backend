import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minlength: 4,
		unique: true,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true
	},
	playlist: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Playlist"
	}]
})


userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v

		delete returnedObject.passwordHash
	}
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)

export default User
