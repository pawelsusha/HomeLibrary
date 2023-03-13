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
exports.blogsRepository = exports.blogs = void 0;
const db_1 = require("../db/db");
exports.blogs = [
    {
        "id": "1",
        "name": "first",
        "description": "blablbalblab",
        "websiteUrl": "www.one.by"
    }
];
exports.blogsRepository = {
    returnAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield db_1.client.db().collection("blogs").find({}).toArray();
            return blogs;
        });
    },
    getBlogsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //let blog : Blog | undefined = blogs.find(p => p.id === id);
            //const blog = await client.db().collection<Blog>("blog").find({id: {$regex: id}}).toArray()
            const blog = yield db_1.client.db().collection("blogs").findOne({ id: id });
            if (blog) {
                return blog;
            }
            else {
                return null;
            }
        });
    },
    createBLog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: '' + (+(new Date())),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: "" + new Date(),
                isMembership: false,
            };
            const result = yield db_1.client.db().collection("blogs").insertOne(newBlog);
            return newBlog;
        });
    },
    updateBlog(id, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client.db().collection("blogs")
                .updateOne({ id: id }, {
                $set: { name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl },
            });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client.db().collection("blogs").deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    //delete all data
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client.db().collection("blogs").deleteMany({});
            return [];
        });
    },
};
