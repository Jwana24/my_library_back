import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reading } from "./Reading";
import { ReadingGenre } from "./ReadingGenre";

@Entity()
export class ReadingType {

    @PrimaryGeneratedColumn()
    id

    @Column()
    name
    @OneToMany(() => Reading, (reading) => reading.type)
    readings
    @OneToMany(() => ReadingGenre, (genre) => genre.type)
    genres
}
