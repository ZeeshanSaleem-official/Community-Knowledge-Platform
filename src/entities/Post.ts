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

  // Relations - lazy import using arrow function to avoid circular dependencies
  @ManyToOne(() => require("./User").User, (user: any) => user.posts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: any;

  @ManyToOne(() => require("./Topic").Topic, (topic: any) => topic.posts)
  @JoinColumn({ name: "topicId" })
  topic!: any;

  @OneToMany(() => require("./Comment").Comment, (comment: any) => comment.post)
  comments!: any[];
}
