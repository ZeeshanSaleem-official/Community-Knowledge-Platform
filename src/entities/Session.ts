import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";

@Entity("user_sessions")
@Unique("UQ_Session_Token", ["sessionToken"]) // <--- FIXED NAME HERE
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column() // <--- REMOVED unique: true (moved to top)
  sessionToken!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "timestamptz" })
  expires!: Date;

  @ManyToOne(
    (type) => {
      const { User } = require("./User");
      return User;
    },
    "user_sessions",
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "userId" })
  user!: any;
}
