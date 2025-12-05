import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from "typeorm";
import { User } from "./User";
import { Topic } from "./Topic";
import { Comment } from "./Comment";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column({ type: "text" }) // Content can be very long
    content!: string;

    @Column({ type: "uuid" })
    userId!: string;

    @Column({ type: "uuid" })
    topicId!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Relations
    @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: User;

    @ManyToOne(() => Topic, (topic) => topic.posts)
    @JoinColumn({ name: "topicId" })
    topic!: Topic;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments!: Comment[];
}