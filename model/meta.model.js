const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required :true
    },
    email: {
        type: String,
        required :true
    },
    interestedin: {
        type: String,
        required :true
    },
    number: {
        type: String,
        required :true
    },
    message: {
        type: String,
        required :true
    }
});

const Meta = new mongoose.model('Meta', userSchema);

module.exports = Meta;