import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { Reading } from "./entity/Reading.js";
import { ReadingGenre } from "./entity/ReadingGenre.js";
import { ReadingType } from "./entity/ReadingType.js";
import { Viewing } from "./entity/Viewing.js";
import { Listening } from "./entity/Listening.js";
import { ViewingGenre } from "./entity/ViewingGenre.js";
import { ViewingType } from "./entity/ViewingType.js";
import { ListeningGenre } from "./entity/ListeningGenre.js";
import { ListeningType } from "./entity/ListeningType.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
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