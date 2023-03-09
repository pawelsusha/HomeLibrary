import {MongoClient,ObjectId} from 'mongodb'



//Connection URL
const url = '';
console.log('url:', url)
const client = new MongoClient(url);


export const runDb = async () => {
    try{
        await client.connect();
        console.log('Connected successfully to server');
    }   catch(e) {
        console.log('! Dont connected to server');
        await client.close()
    }
};
