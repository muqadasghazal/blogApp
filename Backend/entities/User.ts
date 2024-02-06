import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm"
import { Posts } from "./Posts"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    userName!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date

    @OneToMany(()=>Posts , (posts)=>(posts.user) , {cascade:true})
    @JoinTable()
    userPosts!: Posts[]
}