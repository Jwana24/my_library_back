import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { ViewingGenre } from "./ViewingGenre.js";
import { ViewingType } from "./ViewingType.js";

export enum Status {
    VIEWINGINPROGRESS = "Currently viewing",
    TOVIEW = "To view"
}

@Entity()
export class Viewing {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => ViewingGenre)
    @JoinTable()
    genres: ViewingGenre[]
    @ManyToOne(() => ViewingType, (type) => type.viewings)
    type: ViewingType
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
