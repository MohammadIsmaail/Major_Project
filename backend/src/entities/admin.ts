import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"admin"})
export class admin extends BaseEntity{
    @PrimaryGeneratedColumn({name:"id"})
    id:any

    @Column({  name: "name",type: "varchar", length: 255, nullable: false})
    name: any
     
    @Column({  name: "email",type: "varchar", length: 255, nullable: false})
    email: any

    @Column({  name: "mobile",type: "varchar", length: 255, nullable: false})
    mobile: any

    @Column({  name: "profile",type: "varchar", length: 255, nullable: false})
    profile: any

    @Column({  name: "address",type: "varchar", length: 255, nullable: false})
    address: any

    @Column({  name: "created_at",type: "timestamp", default:()=>{"CURRENT_TIMESTAMP"}})
    created_at: any

    @Column({  name: "updated_at",type: "timestamp", default:()=>{"CURRENT_TIMESTAMP"}})
    updated_at: any
}