import {usersRouter} from "../routes/users-router";


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
    async updateConfirmation(id){
    userCollection.updateOne({_id}),{$set:{"emailConfirmation.isConfirmed":true}}
}
export const repositoryDB = {}