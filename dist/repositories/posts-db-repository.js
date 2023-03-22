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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = exports.postsCollection = exports.posts = void 0;
const db_1 = require("../db/db");
exports.posts = [
    {
        "id": "1",
        "title": "first",
        "shortDescription": "firstDesc",
        "content": "firstCont",
        "blogId": "1",
        "blogName": "firstblog"
    },
    {
        "id": "2",
        "title": "second",
        "shortDescription": "secDesc",
        "content": "seccont",
        "blogId": "2",
        "blogName": "second"
    }
];
exports.postsCollection = db_1.client.db().collection("posts");
exports.postsRepository = {
    returnAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield exports.postsCollection.find({}, { projection: { _id: 0 } }).toArray();
            return posts;
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield exports.postsCollection.findOne({ id: id }, { projection: { _id: 0 } });
            return post;
        });
    },
    createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            /* const newPost: Post = {
                 id: '' + (+(new Date())),
                 title: post.title,
                 shortDescription: post.shortDescription,
                 content: post.content,
                 blogId: blogId,
                 blogName: blogName,
                 createdAt: new Date().toISOString()
             }*/
            const result = yield exports.postsCollection.insertOne(newPost);
            return this.getPostById(newPost.id);
            //return newPost
        });
    },
    updatePost(post, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.postsCollection
                .updateOne({ id: id }, {
                $set: {
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId
                },
            });
            return result.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.postsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.postsCollection.deleteMany({});
            return [];
            //return posts
        });
    },
};
