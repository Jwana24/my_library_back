import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import reading from "../routes/reading.js";
import readingType from "../routes/readingType.js";
import readingGenre from "../routes/readingGenre";
import watching from "../routes/watching.js";
import watchingType from "../routes/watchingType";
import watchingGenre from "../routes/watchingGenre";
import listening from "../routes/listening.js";
import listeningType from "../routes/listeningType";
import listeningGenre from "../routes/listeningGenre";

const app = express();
app.use(express.json());
app.use('/', reading);
app.use('/', readingType);
app.use('/', readingGenre);
app.use('/', watching);
app.use('/', watchingType);
app.use('/', watchingGenre);
app.use('/', listening);
app.use('/', listeningType);
app.use('/', listeningGenre);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("The server is running !");
    });
  })
  .catch((error) => console.log("Error during Data Source initialization", error))