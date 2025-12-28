import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";

@Entity("user_sessions")
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

  // Relation - lazy import using arrow function to avoid circular dependencies
  @ManyToOne(() => require("./User").User, (user: any) => user.user_sessions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: any;
}
