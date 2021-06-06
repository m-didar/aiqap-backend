"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("../models/book.model"));
const fs_1 = __importDefault(require("fs"));
const Book = mongoose_1.default.model('Book', book_model_1.default);
const limit_ = 5;
class BookController {
    getBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let aggregate_options = [];
            let page = parseInt(req.query.page) || 1;
            let limit = parseInt(req.query.limit) || limit_;
            const options = {
                page,
                limit,
                collation: { locale: "en" },
                customLabels: {
                    totalDocs: 'totalResults',
                    docs: 'books'
                }
            };
            let match = {};
            if (req.query.title)
                match.title = { $regex: req.query.title, $options: 'i' };
            if (req.query.authorName)
                match.authorName = { $regex: req.query.authorName, $options: 'i' };
            if (req.query.authorSurame)
                match.authorSurame = { $regex: req.query.authorSurame, $options: 'i' };
            if (req.query.category)
                match.categories = req.query.category;
            aggregate_options.push({ $match: match });
            const myAggregate = Book.aggregate(aggregate_options);
            const result = yield Book.aggregatePaginate(myAggregate, options);
            res.status(200).json(result);
        });
    }
    addNewBook(req, res) {
        const audioFilename = req.files ? req.files['audio'][0].filename : 'audio';
        const imgFilename = req.files ? req.files['image'][0].filename : 'image';
        req.body.audioLink = '/public/audio/' + audioFilename;
        req.body.imageLink = '/public/images/' + imgFilename;
        req.body.views = 0;
        req.body.likes = 0;
        if (!req.body.description)
            req.body.description = "";
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
        Book.findById(req.params.bookId, (err, book) => {
            if (err)
                res.send(err);
            if (book) {
                fs_1.default.unlink('.' + book.audioLink, function () { });
                fs_1.default.unlink('.' + book.imageLink, function () { });
            }
        });
        Book.deleteOne({ _id: req.params.bookId }, (err) => {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted book!' });
        });
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map