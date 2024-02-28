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
import { IsInt, IsOptional, Max, Min, validateOrReject } from "class-validator";
import { WatchingGenre } from "./WatchingGenre";
import { WatchingType } from "./WatchingType";

export enum Status {
    WATCHINGINPROGRESS = "En cours de visionnage",
    TOWATCH = "A voir",
    WATCH = "Vu"
}

@Entity()
export class Watching {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => WatchingGenre)
    @JoinTable()
    genres: WatchingGenre[]
    @ManyToOne(() => WatchingType, (type) => type.watchings)
    type: WatchingType
    @Column({
        type: "enum",
        enum: Status
    })
    status: Status
    @Column()
    producer: string
    @Column()
    title: string
    @Column({ type: "varchar", nullable: true })
    image: string
    @Column("boolean")
    saga: boolean
    @Column("text")
    summary: string
    @Column({ type: "integer", nullable: true })
    @IsInt()
    @Min(0)
    @Max(10)
    @IsOptional()
    rating: number

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}
