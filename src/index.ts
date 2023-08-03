import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import reading from "../routes/reading.js";
import readingType from "../routes/readingType.js";
import readingGenre from "../routes/readingGenre";
import viewing from "../routes/viewing.js";
import listening from "../routes/listening.js";

const app = express();
app.use(express.json());
app.use('/', reading);
app.use('/', readingType);
app.use('/', readingGenre);
app.use('/', viewing);
app.use('/', listening);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("The server is running !");
    });
  })
  .catch((error) => console.log("Error during Data Source initialization", error))