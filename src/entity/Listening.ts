import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { ListeningGenre } from "./ListeningGenre.js";
import { ListeningType } from "./ListeningType.js";

@Entity()
export class Listening {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => ListeningGenre)
    @JoinTable()
    genres: ListeningGenre[]
    @ManyToOne(() => ListeningType, (type) => type.listenings)
    type: ListeningType
    @Column()
    artist: string
    @Column()
    title: string
    @Column("blob")
    image: string
}
