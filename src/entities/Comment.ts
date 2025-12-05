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
import { Post } from "./Post";
import { User } from "./User";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text" })
    content!: string;

    @Column({ type: "uuid" })
    postId!: string;

    @Column({ type: "uuid" })
    userId!: string;

    @Column({ type: "uuid", nullable: true })
    parentId!: string | null;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Relation to Post
    @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "postId" })
    post!: Post;

    // Relation to User
    @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: User;

    // Self-Reference (Parent)
    @ManyToOne(() => Comment, (comment) => comment.children, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "parentId" })
    parent!: Comment | null;

    // Self-Reference (Children/Replies)
    @OneToMany(() => Comment, (comment) => comment.parent)
    children!: Comment[];
}