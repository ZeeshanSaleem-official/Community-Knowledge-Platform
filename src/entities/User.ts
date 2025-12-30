import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";

@Entity({ name: "users" })
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
  @Column({ type: "text", nullable: true })
  password!: string;

  // Use table names (from @Entity name) instead of class names
  @OneToMany("accounts", "user")
  accounts!: any[];

  @OneToMany("user_sessions", "user")
  user_sessions!: any[];

  @OneToMany("posts", "user")
  posts!: any[];

  @OneToMany("comments", "user")
  comments!: any[];
}
