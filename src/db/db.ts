/*import {MongoClient} from 'mongodb'
import {UserAccountDBType} from '../repositories/types'
import {settings} from '../settings'

;
export const client = new MongoClient(mongoURI!);
let db = client.db("users-registration")

export const usersAccountsCollection = db.collection<UserAccountDBType>('accounts')

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        //await client.db("products").command({ ping: 1 });
        await client.db().command({ ping: 1 });
        console.log("✅ Connected successfully to mongo server");
    } catch {
        console.error("❌ Can't connect to DB");
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}*/

import {settings} from '../settings'
import dotenv from 'dotenv'
import {MongoClient, ObjectId } from "mongodb";
import {WithId} from 'mongodb'
import {UserAccountType, FeedbackDBType} from "../repositories/types";
import {AdminDBType} from "../repositories/types";

dotenv.config()
const mongoURI: string | undefined = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
//const mongoURI = "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority";



const url = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
console.log('url :', url)
if (!url) {
    throw new Error('❌! Url doesnt found')
}

export const client = new MongoClient(mongoURI!);
export const usersAccountsCollection = client.db().collection<UserAccountType>("users");
export const adminsCollection = client.db().collection<AdminDBType>('admins')
export const feedbacksCollection = client.db().collection<FeedbackDBType>('feedbacks')
//let db = client.db("users-registration")
//export const usersAccountsCollection = db.collection<UserAccountDBType>('accounts')
export const runDb = async () => {
    try {
        await client.connect();
        await client.db().command({ping:1});
        console.log('✅   Connected successfully to server');
    } catch (e) {
        console.log('❌   Does not connected to server');
        await client.close()
    }
};

export class blogsCollection {
}
