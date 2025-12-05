import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Post } from "./Post";

@Entity("topics")
export class Topic {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
    slug!: string;

    @Column({ type: "text" }) // Use text for longer descriptions
    description!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Post, (post) => post.topic)
    posts!: Post[];
}