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

@Entity({ name: "comments" })
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

  // Use table names instead of class names
  @ManyToOne("posts", "comments", { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post!: any;

  @ManyToOne("users", "comments", { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: any;

  // Self-reference using arrow function for lazy resolution
  @ManyToOne(() => Comment, (comment) => comment.children, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "parentId" })
  parent!: Comment | null;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children!: Comment[];
}
