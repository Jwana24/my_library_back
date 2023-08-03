import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ReadingType } from "./ReadingType.js";

@Entity()
export class ReadingGenre {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    @ManyToOne(() => ReadingType, (type) => type.genres)
    type: ReadingType
}
