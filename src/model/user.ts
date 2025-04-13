import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export enum UserRole {
    ADMINISTRATOR = 1,
    USER = 2,
}

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    userId!: string;

    @Column()
    email!: string;

    @Column()
    name!: string;

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
