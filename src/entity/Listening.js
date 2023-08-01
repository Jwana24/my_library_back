import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { ListeningGenre } from "./ListeningGenre";
import { ListeningType } from "./ListeningType";

@Entity()
export class Listening {

    @PrimaryGeneratedColumn()
    id

    @ManyToMany(() => ListeningGenre)
    @JoinTable()
    genres
    @ManyToOne(() => ListeningType, (type) => type.listenings)
    type
    @Column()
    artist
    @Column()
    title
    @Column("blob")
    image
}
