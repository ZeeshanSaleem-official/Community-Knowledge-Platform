import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";

@Entity({ name: "user_sessions" })
@Unique("UQ_Session_Token", ["sessionToken"])
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  sessionToken!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "timestamptz" })
  expires!: Date;

  // Use table name instead of class name
  @ManyToOne("users", "user_sessions", { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: any;
}
