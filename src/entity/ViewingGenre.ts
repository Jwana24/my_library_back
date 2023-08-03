import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ViewingType } from "./ViewingType.js";

@Entity()
export class ViewingGenre {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    @ManyToOne(() => ViewingType, (type) => type.genres)
    type: ViewingType
}
