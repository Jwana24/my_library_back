import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ListeningType } from "./ListeningType";

@Entity()
export class ListeningGenre {

    @PrimaryGeneratedColumn()
    id

    @Column()
    name
    @ManyToOne(() => ListeningType, (type) => type.genres)
    type
}
