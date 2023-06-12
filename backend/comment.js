const mongoose = require("mongoose");
const comment = new mongoose.Schema({
    bookId: String,
    body: String,
    username: String,
    userId: String,
    parentId: String,
    createdAt: String,

});

module.exports = mongoose.model("Comment", comment);
