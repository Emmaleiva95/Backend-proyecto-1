import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
         trim:true
    },
    last_name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    role: {
        type: String,
        required: true,
        trim:true
    },
    pets:{
        type: Array,
        default: []
    }
    
})


export default mongoose.model('Users', usersSchema);