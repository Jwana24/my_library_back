import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { WatchingGenre } from "./WatchingGenre.js";
import { WatchingType } from "./WatchingType.js";

export enum Status {
    WATCHINGINPROGRESS = "En cours de visionnage",
    TOWATCH = "A voir",
    WATCH = "Vu"
}

@Entity()
export class Watching {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => WatchingGenre)
    @JoinTable()
    genres: WatchingGenre[]
    @ManyToOne(() => WatchingType, (type) => type.watchings)
    type: WatchingType
    @Column({
        type: "enum",
        enum: Status
    })
    status: Status
    @Column()
    producer: string
    @Column()
    title: string
    @Column("blob")
    image: string
    @Column("boolean")
    saga: boolean
    @Column("text")
    summary: string
}
