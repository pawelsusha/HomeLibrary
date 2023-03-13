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
exports.postsRepository = exports.posts = void 0;
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
exports.postsRepository = {
    returnAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield db_1.client.db().collection("posts").find({}).toArray();
            return posts;
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.client.db().collection("posts").findOne({ id: id });
            if (post) {
                return post;
            }
            else {
                return false;
            }
        });
    },
    createPost(post, blogId, blogName) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                id: new Date().toISOString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: blogId,
                blogName: blogName,
                createdAt: new Date().toISOString()
            };
            const result = yield db_1.client.db().collection("posts").insertOne(newPost);
            return newPost;
        });
    },
    updatePost(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client.db().collection("posts")
                .updateOne({ id: id }, {
                $set: { title: body.title, shortDescription: body.shortDescription, content: body.content },
            });
            return result.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client.db().collection("blogs").deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    }
};
