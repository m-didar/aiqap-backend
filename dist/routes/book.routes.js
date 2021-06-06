"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const book_controller_1 = require("../controllers/book.controller");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == 'audio')
            cb(null, 'public/audio');
        else
            cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    }
});
const upload = multer_1.default({ storage });
class Routes {
    constructor() {
        this.bookController = new book_controller_1.BookController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successful!'
            });
        });
        app.route('/books')
            .get(this.bookController.getBooks)
            .post(upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), this.bookController.addNewBook);
        app.route('/books/:bookId')
            .get(this.bookController.getBookWithId)
            .put(this.bookController.updateBook)
            .delete(this.bookController.deleteBook);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=book.routes.js.map