import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("user_sessions")
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  sessionToken!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "timestamptz" })
  expires!: Date;
  @ManyToOne(type => {
    const { User } = require("./User");
    return User;
  }, "user_sessions", { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: any;
}
