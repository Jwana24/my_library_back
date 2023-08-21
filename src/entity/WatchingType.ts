import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Watching } from "./Watching";
import { WatchingGenre } from "./WatchingGenre";

@Entity()
export class WatchingType {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string
    @OneToMany(() => Watching, (watching) => watching.type)
    watchings: Watching[]
    @OneToMany(() => WatchingGenre, (genre) => genre.type)
    genres: WatchingGenre[]
}
