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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const book_routes_1 = require("./routes/book.routes");
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
class App {
    constructor() {
        this.route = new book_routes_1.Routes();
        this.mongoUri = process.env.MONGO_CONNECTION_STRING;
        this.database = mongoose_1.default.connection;
        this.app = express_1.default();
        this.app.use('/static', express_1.default.static('public'));
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose_1.default.connect(this.mongoUri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }, (err) => {
            console.log(err === null || err === void 0 ? void 0 : err.message);
        });
        this.database.once("open", () => __awaiter(this, void 0, void 0, function* () {
            console.log("Connected to database");
        }));
        this.database.on("error", () => {
            console.log("Error connecting to database");
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map