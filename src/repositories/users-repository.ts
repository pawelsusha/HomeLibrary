import {client} from '../db/db'
import {UserAccountDBType, UserAccountType} from './types'
import {ObjectId} from 'mongodb'


const dbName = "mydb";
//const collectionName = "users";
//client.db().createCollection<UserAccountType>("users");
export const usersAccountsCollection = client.db().collection<UserAccountType>("users");


export const usersRepository =
    {
        // async createUser(user: UserAccountType): Promise<UserAccountType> {
        //     //-const db = this.client.db(dbName);
        //     //-const collection = db.collection(collectionName);
        //     const result = await usersAccountsCollection.insertOne(user);
        //     return { id: result.insertedId.toString(), ...user };
        // },

        async createUser(newUser: UserAccountType): Promise<UserAccountType> {
            const createResult = await usersAccountsCollection.insertOne(newUser)
            return {
                id: createResult.insertedId.toString(),
                login: newUser.login,
                email: newUser.email,
                password: newUser.password,
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
    async getAll(): Promise<UserAccountType[]> {
        return usersAccountsCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
    },

    async findUserById(id: ObjectId): Promise<UserAccountType | null> {
        let UserById = await usersAccountsCollection.findOne({_id: new ObjectId(id)})
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