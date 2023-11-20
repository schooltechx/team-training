import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}


export class CreateUserDto {

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}
export type UpdateUserDto = Partial<User>
