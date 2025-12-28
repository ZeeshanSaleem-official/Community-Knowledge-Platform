import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";

@Entity("users")
@Unique("UQ_User_Email", ["email"]) // <--- FIXED NAME HERE
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true }) // <--- REMOVED unique: true (moved to top)
  email!: string;

  @Column({ type: "timestamp", nullable: true })
  emailVerified!: Date | null;

  @Column({ nullable: true })
  image!: string;

  // Relations
  @OneToMany((type) => {
    const { Account } = require("./Account");
    return Account;
  }, "user")
  accounts!: any[];

  @OneToMany((type) => {
    const { Session } = require("./Session");
    return Session;
  }, "user")
  user_sessions!: any[];

  @OneToMany((type) => {
    const { Post } = require("./Post");
    return Post;
  }, "user")
  posts!: any[];

  @OneToMany((type) => {
    const { Comment } = require("./Comment");
    return Comment;
  }, "user")
  comments!: any[];
}
