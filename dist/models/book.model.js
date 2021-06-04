"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.BookSchema = new Schema({
    title: {
        type: String,
        required: 'Enter the title'
    },
    authorName: {
        type: String,
        required: 'Enter author name'
    },
    authorSurname: {
        type: String,
        required: 'Enter author surname'
    },
    description: {
        type: String
    },
    categories: {
        type: Array
    },
    views: {
        type: Number
    },
    likes: {
        types: Number
    },
    audioLink: {
        types: String
    }
});
//# sourceMappingURL=book.model.js.map