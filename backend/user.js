const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
  books: [{bookId: String, bookStatus: String}]

});

module.exports = mongoose.model("User", user);
