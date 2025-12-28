import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";

@Entity("users")
@Unique("UQ_User_Email", ["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ type: "timestamp", nullable: true })
  emailVerified!: Date | null;

  @Column({ nullable: true })
  image!: string;

  // Relations - lazy import using arrow function to avoid circular dependencies
  @OneToMany(() => require("./Account").Account, (account: any) => account.user)
  accounts!: any[];

  @OneToMany(() => require("./Session").Session, (session: any) => session.user)
  user_sessions!: any[];

  @OneToMany(() => require("./Post").Post, (post: any) => post.user)
  posts!: any[];

  @OneToMany(() => require("./Comment").Comment, (comment: any) => comment.user)
  comments!: any[];
}
