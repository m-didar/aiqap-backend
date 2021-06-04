"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = require("../models/book.model");
const Book = mongoose_1.default.model('Book', book_model_1.BookSchema);
class BookController {
    getBooks(req, res) {
        Book.find({}, (err, book) => {
            if (err)
                res.send(err);
            res.json(book);
        });
    }
    addNewBook(req, res) {
        let newBook = new Book(req.body);
        newBook.save((err, book) => {
            if (err)
                res.send(err);
            res.json(book);
        });
    }
    getBookWithId(req, res) {
        Book.findById(req.params.bookId, (err, book) => {
            if (err)
                res.send(err);
            res.json(book);
        });
    }
    updateBook(req, res) {
        Book.findOneAndUpdate({ _id: req.params.bookId }, req.body, { new: true }, (err, book) => {
            if (err)
                res.send(err);
            res.json(book);
        });
    }
    deleteBook(req, res) {
        Book.deleteOne({ _id: req.params.bookId }, (err) => {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted book!' });
        });
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map