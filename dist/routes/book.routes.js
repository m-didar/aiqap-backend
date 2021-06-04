"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const book_controller_1 = require("../controllers/book.controller");
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
            .post(this.bookController.addNewBook);
        app.route('/books/:bookId')
            .get(this.bookController.getBookWithId)
            .put(this.bookController.updateBook)
            .delete(this.bookController.deleteBook);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=book.routes.js.map