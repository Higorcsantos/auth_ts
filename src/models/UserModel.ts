import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import bcrypt from 'bcrypt'

@Entity('users')
class UserModel {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 10);
    }
}

export {UserModel};