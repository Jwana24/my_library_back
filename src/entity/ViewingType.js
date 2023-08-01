import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Viewing } from "./Viewing";
import { ViewingGenre } from "./ViewingGenre";

@Entity()
export class ViewingType {

    @PrimaryGeneratedColumn()
    id

    @Column()
    name
    @OneToMany(() => Viewing, (viewing) => viewing.type)
    viewings
    @OneToMany(() => ViewingGenre, (genre) => genre.type)
    genres
}
