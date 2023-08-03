import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Viewing } from "./Viewing.js";
import { ViewingGenre } from "./ViewingGenre.js";

@Entity()
export class ViewingType {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    @OneToMany(() => Viewing, (viewing) => viewing.type)
    viewings: Viewing[]
    @OneToMany(() => ViewingGenre, (genre) => genre.type)
    genres: ViewingGenre[]
}
