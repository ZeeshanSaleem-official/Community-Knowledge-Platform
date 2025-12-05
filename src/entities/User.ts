import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Account } from "./Account";
import { Session } from "./Session"; // Import these
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: true })
    name!: string;

    @Column({ unique: true, nullable: true })
    email!: string;

    @Column({ type: "timestamp", nullable: true })
    emailVerified!: Date | null;

    @Column({ nullable: true })
    image!: string;

    // Existing Account Relation
    @OneToMany(() => Account, (account) => account.user)
    accounts!: Account[];

    // 👇 ADD THESE NEW RELATIONS 👇
    @OneToMany(() => Session, (session) => session.user)
    sessions!: Session[];

    @OneToMany(() => Post, (post) => post.user)
    posts!: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments!: Comment[];
}