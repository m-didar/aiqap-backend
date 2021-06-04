import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const Schema = mongoose.Schema;

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
})

BookSchema.plugin(aggregatePaginate);

export default BookSchema;
