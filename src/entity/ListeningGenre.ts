import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ListeningType } from "./ListeningType.js";

@Entity()
export class ListeningGenre {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    @ManyToOne(() => ListeningType, (type) => type.genres)
    type: ListeningType
}
