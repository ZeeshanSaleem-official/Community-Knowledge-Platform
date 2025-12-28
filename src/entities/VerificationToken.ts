import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("verification_tokens")
@Unique("UQ_Verification_Composite", ["identifier", "token"]) // <--- FIXED NAME HERE
@Unique("UQ_Verification_Token", ["token"]) // <--- FIXED NAME HERE
export class VerificationToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  identifier!: string;

  @Column() // <--- REMOVED unique: true (moved to top)
  token!: string;

  @Column({ type: "timestamp" })
  expires!: Date;
}
