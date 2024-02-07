import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
    BeforeInsert,
    BeforeUpdate
} from "typeorm";
import { ListeningGenre } from "./ListeningGenre";
import { ListeningType } from "./ListeningType";
import { IsInt, Max, Min, validateOrReject } from "class-validator";

export enum Status {
    TOLISTEN = "A écouter",
    LISTEN = "Ecouté"
}

@Entity()
export class Listening {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => ListeningGenre)
    @JoinTable()
    genres: ListeningGenre[]
    @ManyToOne(() => ListeningType, (type) => type.listenings)
    type: ListeningType
    @Column({
        type: "enum",
        enum: Status
    })
    status: Status
    @Column()
    artist: string
    @Column()
    title: string
    @Column({ type: "varchar", nullable: true })
    image: string
    @Column({ type: "integer", nullable: true })
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}
