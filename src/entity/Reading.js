import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { ReadingGenre } from "./ReadingGenre";
import { ReadingType } from "./ReadingType";

export const Status = {
    readingInProgress: "Currently reading",
    toRead: "To read",
    toBuy: "To buy"
}

export const Lang = {
    fr: "Français",
    en: "Anglais"
}

@Entity()
export class Reading {

    @PrimaryGeneratedColumn()
    id

    @ManyToMany(() => ReadingGenre)
    @JoinTable()
    genres
    @ManyToOne(() => ReadingType, (type) => type.readings)
    type
    @Column({
        type: "enum",
        enum: Status
    })
    status
    @Column()
    author
    @Column()
    title
    @Column("blob")
    image
    @Column("boolean")
    saga
    @Column("text")
    summary
    @Column({
        type: "enum",
        enum: Lang
    })
    lang
}
