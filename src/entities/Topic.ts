import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from "typeorm";

@Entity("topics")
@Unique("UQ_Topic_Slug", ["slug"]) // <--- FIXED NAME HERE
export class Topic {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column() // <--- REMOVED unique: true (moved to top)
  slug!: string;

  @Column({ type: "text" })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany((type) => {
    const { Post } = require("./Post");
    return Post;
  }, "topic")
  posts!: any[];
}
