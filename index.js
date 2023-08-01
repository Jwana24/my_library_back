import express from "express";
import "reflect-metadata";

const app = express();

app.listen(process.env.PORT, () => {
    console.log("The server is running !");
});