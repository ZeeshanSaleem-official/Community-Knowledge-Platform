import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from "typeorm"
import { User } from "./User"
import { text } from "stream/consumers"
import { user } from "@nextui-org/react"
@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id!: Number

    @Column({
        type: "uuid",
    })
    userId!: string

    @Column()
    type!: string

    @Column()
    provider!: string

    @Column()
    providerAccountId!: string;

    @Column({ type: "text", nullable: true })
    refresh_token!: string | null;

    @Column({ type: "text", nullable: true })
    access_token!: string | null;

    @Column({ type: "int", nullable: true })
    expires_at!: number | null
    @Column({ type: "varchar", nullable: true })
    token_type!: string | null;

    @Column({ type: "varchar", nullable: true })
    scope!: string | null;

    @Column({ type: "text", nullable: true })
    id_token!: string | null;

    @Column({ type: "varchar", nullable: true })
    session_state!: string | null;

    @ManyToOne(() => User, (user) => user.accounts, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "uuid" })
    user!: User
}