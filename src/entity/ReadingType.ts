import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reading } from "./Reading";
import { ReadingGenre } from "./ReadingGenre";

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
