const mongoose = require("mongoose");

const borrowedBookSchema = new mongoose.Schema({
  bookID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema,'BorrowedBook');

module.exports = BorrowedBook;
