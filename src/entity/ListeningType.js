import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Listening } from "./Listening";
import { ListeningGenre } from "./ListeningGenre";

@Entity()
export class ListeningType {

    @PrimaryGeneratedColumn()
    id

    @Column()
    name
    @OneToMany(() => Listening, (listening) => listening.type)
    listenings
    @OneToMany(() => ListeningGenre, (genre) => genre.type)
    genres
}
