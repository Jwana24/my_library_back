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
import { IsInt, Min, Max, validateOrReject, IsOptional } from "class-validator";
import { ReadingGenre } from "./ReadingGenre";
import { ReadingType } from "./ReadingType";

export enum Status {
    READINGINPROGRESS = "En cours de lecture",
    TOREAD = "A lire",
    TOBUY = "A acheter",
    READ = "Lu"
}

export enum Lang {
    FR = "Français",
    EN = "Anglais"
}

@Entity()
export class Reading {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => ReadingGenre)
    @JoinTable()
    genres: ReadingGenre[]
    @ManyToOne(() => ReadingType, (type) => type.readings)
    type: ReadingType
    @Column({
        type: "enum",
        enum: Status
    })
    status: Status
    @Column()
    author: string
    @Column()
    title: string
    @Column({ type: "varchar", nullable: true })
    image: string
    @Column("boolean")
    saga:boolean
    @Column("text")
    summary: string
    @Column({
        type: "enum",
        enum: Lang
    })
    lang: Lang
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
