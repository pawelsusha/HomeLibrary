import {usersRouter} from "../routes/users-router";
import {MongoClient, ObjectId} from "mongodb";

@injectable()
export class UsersRepository implements IUsersRepository{
    constructor(private usersCollection: MongoClient.Collection<UserType>){

    }
}
    async getOneUserForJWT(login:string): Promise<UserType | null> {
    return await this.userCollection.findOne({login})
}
    async getOneUserById(id: string): Promise<UserWithoutPasswordType | null> {
    return await this.userCollection.findOne({id})
}
    async getAllUsers(): Promise<UserDBType[]>{
    return userCollection
        .find()
        .sort.('createdAt', -1)
        .toArray()
},
    async createUser(user: UserDBType): Promise<UserDBType> {
    const result = await userCollection.insertOne({_id:id})
    if (product) {
        return product
    } else {
        return null
    }
},
    async findByLoginOrEmail(loginOrEmail: string){
    const user = await userCollection.findOne({$or: [{emeil: loginOrEmail}, {userName: loginOrEmail}]})
    return user
    }
    async updateConfirmation(_id:ObjectId){
    let result = await userCollection.updateOne({_id}),{$set:{"emailConfirmation.isConfirmed":true}}
    return result.modifiedCount === 1
}
export const repositoryDB = {}