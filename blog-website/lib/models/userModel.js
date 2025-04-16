import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
    },
    password: {
        type: String,
        required: true,
    }
});

// Ensure the model is only compiled once
const UserModel = mongoose.models.user || mongoose.model('user', UserSchema);

export default UserModel;