import "reflect-metadata";
import { DataSource } from "typeorm";
import { Reading } from "./entity/Reading";
import { ReadingGenre } from "./entity/ReadingGenre";
import { ReadingType } from "./entity/ReadingType";
import { Viewing } from "./entity/Viewing";
import { Listening } from "./entity/Listening";
import { ViewingGenre } from "./entity/ViewingGenre";
import { ViewingType } from "./entity/ViewingType";
import { ListeningGenre } from "./entity/ListeningGenre";
import { ListeningType } from "./entity/ListeningType";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Reading,
        ReadingGenre,
        ReadingType,
        Viewing,
        ViewingGenre,
        ViewingType,
        Listening,
        ListeningGenre,
        ListeningType
    ],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log("Error during Data Source initialization", error))
