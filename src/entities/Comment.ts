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

  // Relations - lazy import using arrow function to avoid circular dependencies
  @ManyToOne(() => require("./Post").Post, (post: any) => post.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "postId" })
  post!: any;

  @ManyToOne(() => require("./User").User, (user: any) => user.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: any;

  // Self-Reference (Parent)
  @ManyToOne(() => Comment, (comment) => comment.children, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "parentId" })
  parent!: Comment | null;

  // Self-Reference (Children/Replies)
  @OneToMany(() => Comment, (comment) => comment.parent)
  children!: Comment[];
}
