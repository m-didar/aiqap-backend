"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const BookSchema = new Schema({
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
        type: String,
        required: 'Enter description'
    },
    categories: {
        type: Array,
        required: 'Enter categories'
    },
    views: {
        type: Number
    },
    likes: {
        type: Number
    },
    audioLink: {
        type: String
    },
    imageLink: {
        type: String
    }
});
BookSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.default = BookSchema;
//# sourceMappingURL=book.model.js.map