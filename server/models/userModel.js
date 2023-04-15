const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username should be at least 5 characters'],
        maxlength: [15, 'Username should be at most 15 characters'],
        validate: {
            validator: function (v) {
                return /^[a-z_0-9]{5,15}/g.test(v);
            },
            message: props => `${props.value} must contains only lowercase letters, digits and lowercase(_)!`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password should be at least 6 characters']
    },
    contestsOwner: [{
        type: ObjectId,
        ref: "Contest"
    }],
    contestsParticipates: [{
        type: ObjectId,
        ref: "Contest"
    }],
}, { timestamps: { createdAt: 'created_at' } });

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                }
                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
