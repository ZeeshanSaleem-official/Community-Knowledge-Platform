import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

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
  @ManyToOne(type => {
    const { User } = require("./User");
    return User;
  }, "posts", { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: any;

  @ManyToOne(type => {
    const { Topic } = require("./Topic");
    return Topic;
  }, "posts")
  @JoinColumn({ name: "topicId" })
  topic!: any;

  @OneToMany(type => {
    const { Comment } = require("./Comment");
    return Comment;
  }, "post")
  comments!: any[];
}
