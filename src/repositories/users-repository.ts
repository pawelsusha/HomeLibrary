import {client} from '../db/db'
import {UserAccountDBType, UserAccountType} from './types'
import {ObjectId} from 'mongodb'



export const usersAccountsCollection = client.db().collection<UserAccountType>('users');
export const usersRepository =
    {
        async createUser(newUser: UserAccountType): Promise<UserAccountType | null> {
            const result = await usersAccountsCollection.insertOne(newUser)
            return newUser

        },
    async getAllUsers(): Promise<UserAccountType[]> {
        return usersAccountsCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
    },

    async findUserById(id: ObjectId): Promise<UserAccountType | null> {
        let UserById = await usersAccountsCollection.findOne({_id: id})
        if (UserById) {
            return UserById
        } else {
            return null
        }
    },
    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersAccountsCollection.findOne({ $or: [ { email: loginOrEmail }, { userName: loginOrEmail } ] } )
        return user
    }
}

//export const repositoryDB = {}