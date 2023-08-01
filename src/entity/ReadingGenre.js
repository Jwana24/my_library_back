import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ReadingType } from "./ReadingType";

@Entity()
export class ReadingGenre {

    @PrimaryGeneratedColumn()
    id

    @Column()
    name
    @ManyToOne(() => ReadingType, (type) => type.genres)
    type
}
