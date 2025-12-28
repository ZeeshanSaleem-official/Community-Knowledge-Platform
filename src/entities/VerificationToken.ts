import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity({ name: "verification_tokens" })
@Unique("UQ_Verification_Composite", ["identifier", "token"])
@Unique("UQ_Verification_Token", ["token"])
export class VerificationToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  identifier!: string;

  @Column()
  token!: string;

  @Column({ type: "timestamp" })
  expires!: Date;
}
