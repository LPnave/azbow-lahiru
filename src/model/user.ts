import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
    ADMINISTRATOR = 1,
    USER = 2,
}

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    phone!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
      })
      role!: UserRole;
}
