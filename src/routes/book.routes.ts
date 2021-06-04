import express, { Request, Response } from 'express'
import { BookController } from "../controllers/book.controller";
import multer from 'multer'
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == 'audio') cb(null, 'public/audio');
        else cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random()*1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage });

export class Routes {

    public bookController: BookController = new BookController();

    public routes(app: express.Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successful!'
                })
            })

        app.route('/books')
            .get(this.bookController.getBooks)
            .post(upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), this.bookController.addNewBook);

        app.route('/books/:bookId')
            .get(this.bookController.getBookWithId)
            .put(this.bookController.updateBook)
            .delete(this.bookController.deleteBook);
    }
}
