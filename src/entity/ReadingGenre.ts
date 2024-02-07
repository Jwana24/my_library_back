import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ReadingType } from "./ReadingType";

@Entity()
export class ReadingGenre {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    @ManyToOne(() => ReadingType, (type) => type.genres)
    type: ReadingType
}
