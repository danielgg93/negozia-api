const { Schema, model } = require('mongoose');
const { ROLES } = require('../constants');


const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        requiredd: true
    },
    role: {
        type: String,
        required: true
    },
    isActive:{
        type:Boolean, 
        default: true
    }
},
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

UserSchema
    .virtual('isAdmin')
    .get(function () {
        return this.role === ROLES.ADMIN;
    });

    UserSchema.method('toJson', function() {
        const{__v,_id,...object} = this.toObject();
        object.id = _id;
        return object;
    })

module.exports = model('User', UserSchema);