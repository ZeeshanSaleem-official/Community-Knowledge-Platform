import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("sessions")
export class Session {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
    sessionToken!: string;

    @Column({ type: "uuid" })
    userId!: string;

    @Column({ type: "timestamp" })
    expires!: Date;

    @ManyToOne("User", "sessions", { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: any;
}