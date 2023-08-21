import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reading } from "./Reading.js";
import { ReadingGenre } from "./ReadingGenre.js";

@Entity()
export class ReadingType {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string
    @OneToMany(() => Reading, (reading) => reading.type)
    readings: Reading[]
    @OneToMany(() => ReadingGenre, (genre) => genre.type)
    genres: ReadingGenre[]
}
