import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { Reading } from "./entity/Reading.js";
import { ReadingGenre } from "./entity/ReadingGenre.js";
import { ReadingType } from "./entity/ReadingType.js";
import { Watching } from "./entity/Watching";
import { Listening } from "./entity/Listening.js";
import { WatchingGenre } from "./entity/WatchingGenre";
import { WatchingType } from "./entity/WatchingType";
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
        Watching,
        WatchingGenre,
        WatchingType,
        Listening,
        ListeningGenre,
        ListeningType
    ],
    migrations: [],
    subscribers: [],
})