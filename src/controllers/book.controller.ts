import mongoose, { CallbackError } from 'mongoose';
import BookSchema from '../models/book.model';
import { Request, Response } from 'express';
import fs from "fs";

const Book = mongoose.model('Book', BookSchema);
const limit_ = 5;

export class BookController {

    public async getBooks (req: Request, res: Response) {
        let aggregate_options = [];

        let page = parseInt(<string>req.query.page) || 1;
        let limit = parseInt(<string>req.query.limit) || limit_;

        const options = {
            page,
            limit,
            collation: {locale: "en"},
            customLabels: {
                totalDocs: 'totalResults',
                docs: 'books'
            }
        }

        let match: any = {};
        if (req.query.title) match.title = {$regex: req.query.title, $options: 'i'};

        if (req.query.authorName) match.authorName = {$regex: req.query.authorName, $options: 'i'};
        if (req.query.authorSurame) match.authorSurame = {$regex: req.query.authorSurame, $options: 'i'};

        if (req.query.category) match.categories = req.query.category;


        aggregate_options.push({$match: match});

        const myAggregate = Book.aggregate(aggregate_options);
        const result = await Book.aggregatePaginate(myAggregate, options);
        res.status(200).json(result);
    }

    public addNewBook (req: Request, res: Response) {
        const audioFilename = req.files ? req.files['audio'][0].filename : 'audio';
        const imgFilename = req.files ? req.files['image'][0].filename : 'image';
        req.body.audioLink = '/public/audio/' + audioFilename;
        req.body.imageLink = '/public/images/' + imgFilename;
        req.body.views = 0;
        req.body.likes = 0;
        if (!req.body.description) req.body.description = "";
        let newBook = new Book(req.body);
        newBook.save((err: CallbackError, book: any) => {
            if (err) res.send(err);
            res.json(book);
        })
    }

    public getBookWithId (req: Request, res: Response) {
        Book.findById(req.params.bookId, (err: any, book: any) => {
            if (err) res.send(err);
            res.json(book);
        })
    }

    public updateBook (req: Request, res: Response) {
        Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}, (err, book) => {
            if (err) res.send(err);
            res.json(book);
        })
    }

    public deleteBook (req: Request, res: Response) {
        Book.findById(req.params.bookId, (err: any, book: any) => {
            if (err) res.send(err);
            if (book) {
                fs.unlink('.' + book.audioLink, function () {});
                fs.unlink('.' + book.imageLink, function () {});
            }
        })
        Book.deleteOne({_id: req.params.bookId},  (err: CallbackError) => {
            if (err) res.send(err);
            res.json({message: 'Successfully deleted book!'});
        })
    }
}
