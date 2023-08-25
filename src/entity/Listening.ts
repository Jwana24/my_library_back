import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { ListeningGenre } from "./ListeningGenre.js";
import { ListeningType } from "./ListeningType.js";

export enum Status {
    TOLISTEN = "A écouter",
    LISTEN = "Ecouté"
}

@Entity()
export class Listening {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => ListeningGenre)
    @JoinTable()
    genres: ListeningGenre[]
    @ManyToOne(() => ListeningType, (type) => type.listenings)
    type: ListeningType
    @Column({
        type: "enum",
        enum: Status
    })
    status: Status
    @Column()
    artist: string
    @Column()
    title: string
    @Column({ type: "varchar", nullable: true })
    image: string
}
