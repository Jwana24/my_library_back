import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ViewingType } from "./ViewingType";

@Entity()
export class ViewingGenre {

    @PrimaryGeneratedColumn()
    id

    @Column()
    name
    @ManyToOne(() => ViewingType, (type) => type.genres)
    type
}
