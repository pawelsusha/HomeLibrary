import {client, usersAccountsCollection} from '../db/db'
import {UserAccountDBType, UserAccountType, UserAccountType2} from '../repositories/types'
import {ObjectId} from 'mongodb'
import {UserViewModel} from "../models/UsersModels/UserViewModel";
import {UserCreateModel} from "../models/UsersModels/UserCreateModel";


const dbName = "mydb";
//const collectionName = "users";
//client.db().createCollection<UserAccountType>("users");


export const usersRepository =
    {
        // async createUser(user: UserAccountType): Promise<UserAccountType> {
        //     //-const db = this.client.db(dbName);
        //     //-const collection = db.collection(collectionName);
        //     const result = await usersAccountsCollection.insertOne(user);
        //     return { id: result.insertedId.toString(), ...user };
        // },


//        async createUser(newUser: UserAccountType): Promise<UserAccountType> {
        async createUser(newUser: UserAccountType): Promise<UserViewModel> {
            const createResult = await usersAccountsCollection.insertOne(newUser)
            return {
                id: createResult.insertedId.toString(),
                login: newUser.login,
                email: newUser.email,
                // passwordHash: newUser.passwordHash,
                // passwordSalt: newUser.passwordSalt,
                createdAt: newUser.createdAt,
            }
        },

        // async getAll(): Promise<UserAccountType[]> {
        //     const result = await usersAccountsCollection.find({}).toArray();
        //     return result.map((user) => {
        //         const { _id, ...userData } = user;
        //         return { id: _id.toString(), ...userData } as UserAccountType;
        //     });
        // },
    // async getAll(): Promise<UserAccountType2[]> {
    //     return usersAccountsCollection
    //         .find()
    //         .sort('createdAt', -1)
    //         .toArray()
    // },
    async getAll(): Promise<UserAccountType[]> {
        const createResult = await usersAccountsCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
        return      createResult ;
    },

    async findUserById(id: string): Promise<UserAccountType | null> {
        let userById = await usersAccountsCollection.findOne({_id: new ObjectId(id)})
        if (userById) {
            return userById
        } else {
            return null
        }
    },
    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersAccountsCollection.findOne({ $or: [ { email: loginOrEmail }, { userName: loginOrEmail } ] } )
        return user
    }
}


export { usersAccountsCollection };
//export const repositoryDB = {}