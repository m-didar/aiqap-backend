import express from 'express';
import bodyParser from 'body-parser';
import { Routes } from './routes/book.routes';
import mongoose from 'mongoose'
require('dotenv').config();

class App {
    public app: express.Application;
    public route: Routes = new Routes();
    public mongoUri: string = process.env.MONGO_CONNECTION_STRING!;
    public database: mongoose.Connection = mongoose.connection;

    constructor() {
        this.app = express();
        this.app.use('/static', express.static('public'));
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {

        mongoose.connect(this.mongoUri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }, (err) => {
            console.log(err?.message);
        })

        this.database.once("open", async () => {
            console.log("Connected to database");
        })

        this.database.on("error", () => {
            console.log("Error connecting to database");
        })
    }
}

export default new App().app;
