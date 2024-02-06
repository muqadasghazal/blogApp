import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate ,ManyToOne, JoinTable} from "typeorm"
import { User } from "./User"

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    content!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createAt!: Date

    @ManyToOne(() => User, user => user.userPosts , {eager:true , onDelete:"CASCADE",onUpdate:"CASCADE" })
    @JoinTable()
    user!:User


    @BeforeUpdate()
    updateTimeStamp=()=>{
        this.updatedAt = new Date().getTime();
    }

}