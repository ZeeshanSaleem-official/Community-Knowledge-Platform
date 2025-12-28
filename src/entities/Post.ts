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

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "uuid" })
  topicId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Use table names instead of class names
  @ManyToOne("users", "posts", { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: any;

  @ManyToOne("topics", "posts")
  @JoinColumn({ name: "topicId" })
  topic!: any;

  @OneToMany("comments", "post")
  comments!: any[];
}
