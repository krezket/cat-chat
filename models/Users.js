const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    thoughtText: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Thoughts'
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'User'
        }
    ],
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/], 
        unique: true
     },
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;