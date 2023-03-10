"use strict";
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
exports.runDb = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
console.log(process.env.MONGO_URL);
//output - mongodb+srv://a:a@ava.epzello.mongodb.net/?retryWrites=true&w=majority
//Connection URL
const url = process.env.MONGO_URL;
//const url = 'mongodb+srv://pawelsusha:7M23z3IpFiOgiG7r@cluster0.ngg2ptw.mongodb.net/API?retryWrites=true&w=majority';
console.log('url:', url);
if (!url) {
    throw new Error('!Url not founded');
}
const client = new mongodb_1.MongoClient(url);
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log('Connected successfully to server');
    }
    catch (e) {
        console.log('! Dont connected to server');
        yield client.close();
    }
});
exports.runDb = runDb;
