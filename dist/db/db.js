"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsCollection = exports.runDb = exports.feedbacksCollection = exports.adminsCollection = exports.usersAccountsCollection = exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
//const mongoURI = "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority";
const url = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
console.log('url :', url);
if (!url) {
    throw new Error('❌! Url doesnt found');
}
exports.client = new mongodb_1.MongoClient(mongoURI);
exports.usersAccountsCollection = exports.client.db().collection("users");
exports.adminsCollection = exports.client.db().collection('admins');
exports.feedbacksCollection = exports.client.db().collection('feedbacks');
//let db = client.db("users-registration")
//export const usersAccountsCollection = db.collection<UserAccountDBType>('accounts')
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        yield exports.client.db().command({ ping: 1 });
        console.log('✅   Connected successfully to server');
    }
    catch (e) {
        console.log('❌   Does not connected to server');
        yield exports.client.close();
    }
});
exports.runDb = runDb;
class blogsCollection {
}
exports.blogsCollection = blogsCollection;
