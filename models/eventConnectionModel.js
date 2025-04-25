import mongoose from "mongoose";
import bcrypt from "bcrypt";

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    role: {
        type: String,
        trim: true
    },
    admins: [{
        type: String,
        unique:true
    }],
    submembers: [{
        type: String,
        unique:true
    }],
    ownerId: {
        type: String,
        required: true
    },
    awaitingSubmembers: [{
        type: String
    }],
    settings: {
        openEvent: { type: Boolean, default: true }
    }
}, { timestamps: true });


const event = mongoose.model('event', eventSchema);


export default event;