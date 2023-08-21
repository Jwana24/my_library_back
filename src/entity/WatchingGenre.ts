import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { WatchingType } from "./WatchingType";

@Entity()
export class WatchingGenre {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string
    @ManyToOne(() => WatchingType, (type) => type.genres)
    type: WatchingType
}
