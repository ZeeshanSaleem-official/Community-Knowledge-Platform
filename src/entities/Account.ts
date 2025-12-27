import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "uuid",
  })
  userId!: string;

  @Column()
  type!: string;

  @Column()
  provider!: string;

  @Column()
  providerAccountId!: string;

  @Column({ type: "text", nullable: true })
  refresh_token!: string | null;

  @Column({ type: "text", nullable: true })
  access_token!: string | null;

  @Column({ type: "int", nullable: true })
  expires_at!: number | null;

  @Column({ type: "varchar", nullable: true })
  token_type!: string | null;

  @Column({ type: "varchar", nullable: true })
  scope!: string | null;

  @Column({ type: "text", nullable: true })
  id_token!: string | null;

  @Column({ type: "varchar", nullable: true })
  session_state!: string | null;

  @ManyToOne(
    (type) => {
      const { User } = require("./User");
      return User;
    },
    "accounts",
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "userId" })
  user!: any;
}
