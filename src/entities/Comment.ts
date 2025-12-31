import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
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

  // Note: Self-referencing parent/children relations removed to avoid
  // cyclic dependency error on Vercel. Use parentId column directly
  // for parent-child relationships in queries.
}

