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

  // Relations - using arrow functions delays entity resolution
  @OneToMany("Account", "user")
  accounts!: any[];

  @OneToMany("Session", "user")
  user_sessions!: any[];

  @OneToMany("Post", "user")
  posts!: any[];

  @OneToMany("Comment", "user")
  comments!: any[];
}
