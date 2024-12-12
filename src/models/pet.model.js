import mongoose from "mongoose";

const petsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    adopted: {
        type: Boolean,
        required: true,
        default: false
    }
})


export default mongoose.model('Pets', petsSchema);