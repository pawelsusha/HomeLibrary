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
exports.blogsRepository = exports.blogsCollection = exports.blogs = void 0;
const db_1 = require("../db/db");
exports.blogs = [
    {
        "id": "1",
        "name": "first",
        "description": "blablbalblab",
        "websiteUrl": "www.one.by"
    }
];
exports.blogsCollection = db_1.client.db().collection("blogs");
exports.blogsRepository = {
    /*
            async returnAllBlogs(): Promise<Blog[]> {
           // const blogs = await client.db().collection<Blog>("blogs").find({}).toArray()
            const blogs = await blogsCollection.find({}, {projection: {_id: 0}}).toArray()
            return blogs
        },
    */
    returnAllBlogs(searchNameTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.blogsCollection
                .countDocuments({ name: { $regex: searchNameTerm, $options: 'i' } });
        });
    },
    getBlogsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //let blog : Blog | undefined = blogs.find(p => p.id === id);
            //const blog = await client.db().collection<Blog>("blog").find({id: {$regex: id}}).toArray()
            const blog = yield exports.blogsCollection.findOne({ id: id }, { projection: { _id: 0 } });
            return blog;
        });
    },
    createBLog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            //const result = await client.db().collection<Blog>("blogs").insertOne(newBlog)
            //return (newBlog)
            const result = yield exports.blogsCollection.insertOne(newBlog);
            return this.getBlogsById(newBlog.id);
        });
    },
    /*    async updateBlog(id: string, blog: Blog): Promise<boolean> {
            const result = await blogsCollection
                .updateOne({id: id}, {
                    $set: {name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl},
                })
            return result.matchedCount === 1
        },*/
    updateBlogById(blog, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.blogsCollection.updateOne({ id: id }, { $set: blog });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.blogsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    //delete all data
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.blogsCollection.deleteMany({});
            return [];
        });
    },
};
