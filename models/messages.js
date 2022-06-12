const mongoose = require('mongoose');
const schema = mongoose.Schema

const MessagesSchema = new schema ({
    Name:"name",
    Email: "email",
    Message: "message",
})

module.exports = mongoose.models("MessagesSchema", MessagesSchema)