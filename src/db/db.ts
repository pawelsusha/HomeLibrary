import {MongoClient,ObjectId} from 'mongodb'



//Connection URL
const url = 'mongodb+srv://pawelsusha:7M23z3IpFiOgiG7r@cluster0.ngg2ptw.mongodb.net/?retryWrites=true&w=majority';
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
