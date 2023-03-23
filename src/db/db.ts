import dotenv from 'dotenv'
import {MongoClient} from "mongodb";
dotenv.config()
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
//const mongoURI = "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority";



const url = process.env.MONGO_URL
console.log('url :', url)
if (!url) {
    throw new Error('❌! Url doesnt found')
}

export const client = new MongoClient(mongoURI);
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