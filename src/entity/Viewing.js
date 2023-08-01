import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { ViewingGenre } from "./ViewingGenre";
import { ViewingType } from "./ViewingType";

export const Status = {
    viewingInProgress: "Currently viewing",
    toView: "To view"
}

@Entity()
export class Viewing {

    @PrimaryGeneratedColumn()
    id

    @ManyToMany(() => ViewingGenre)
    @JoinTable()
    genres
    @ManyToOne(() => ViewingType, (type) => type.viewings)
    type
    @Column({
        type: "enum",
        enum: Status
    })
    status
    @Column()
    producer
    @Column()
    title
    @Column("blob")
    image
    @Column("boolean")
    saga
    @Column("text")
    summary
}
