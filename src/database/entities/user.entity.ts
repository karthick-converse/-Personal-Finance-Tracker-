import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
  
    @PrimaryGeneratedColumn()
    id:string;

    @Column({
        unique:true,
        nullable:false
    })
    email:string
   
    @Column({
        nullable:false
    })
    password:string

    @Column({
        nullable:false
    })
    full_name:string

    @Column({
        type:'timestamp'
    })
    created_at:Date

    @Column({
        type:"timestamp"
    })
    updated_at:Date

}
