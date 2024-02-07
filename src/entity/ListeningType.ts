import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Listening } from "./Listening";
import { ListeningGenre } from "./ListeningGenre";

@Entity()
export class ListeningType {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string
    @OneToMany(() => Listening, (listening) => listening.type)
    listenings: Listening[]
    @OneToMany(() => ListeningGenre, (genre) => genre.type)
    genres: ListeningGenre[]
}
