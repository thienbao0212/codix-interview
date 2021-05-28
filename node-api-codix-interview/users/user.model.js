const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // username: { type: String, unique: true, required: true },
    // hash: { type: String, required: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    // createdDate: { type: Date, default: Date.now }

    nickName: { type: String, unique: true, required: true },
    password: { type: String,  unique: true, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    countryID: { type: Number, required: true },

});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);