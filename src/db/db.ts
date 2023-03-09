import {MongoClient, ObjectId} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'


console.log(process.env.MONGO_URL)
//output - mongodb+srv://a:a@ava.epzello.mongodb.net/?retryWrites=true&w=majority

//Connection URL
const url = process.env.MONGO_URL
console.log('url:', url)
if (!url) {
    throw new Error('!Url not founded')
}
const client = new MongoClient(url);


export const runDb = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
    } catch (e) {
        console.log('! Dont connected to server');
        await client.close()
    }
};
