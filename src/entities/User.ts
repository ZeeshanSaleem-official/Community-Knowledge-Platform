import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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

  // Relations - using callback functions to delay entity resolution
  @OneToMany(type => {
    const { Account } = require("./Account");
    return Account;
  }, "user")
  accounts!: any[];

  @OneToMany(type => {
    const { Session } = require("./Session");
    return Session;
  }, "user")
  user_sessions!: any[];

  @OneToMany(type => {
    const { Post } = require("./Post");
    return Post;
  }, "user")
  posts!: any[];

  @OneToMany(type => {
    const { Comment } = require("./Comment");
    return Comment;
  }, "user")
  comments!: any[];
}
