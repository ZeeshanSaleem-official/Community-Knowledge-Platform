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
    @ManyToOne("Post", "comments", { onDelete: "CASCADE" })
    @JoinColumn({ name: "postId" })
    post!: any;

    // Relation to User
    @ManyToOne("User", "comments", { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: any;

    // Self-Reference (Parent)
    @ManyToOne("Comment", "children", { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "parentId" })
    parent!: any | null;

    // Self-Reference (Children/Replies)
    @OneToMany("Comment", "parent")
    children!: any[];
}