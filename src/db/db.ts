import dotenv from 'dotenv'
import {MongoClient} from "mongodb";
dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
export const client = new MongoClient(mongoURI);
//Connection URL
const url = process.env.MONGO_URL
console.log('url:', url)
if (!url) {
    throw new Error('!Url not founded')
}
export const runDb = async () => {
    try {
        await client.connect();
        console.log('✅   Connected successfully to server');
    } catch (e) {
        console.log('! Dont connected to server');
        await client.close()
    }
};
