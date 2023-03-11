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
            let blog = exports.blogs.find(p => p.id === id);
            return blog;
        });
    },
    createBLog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: '' + (+(new Date())),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl
            };
            const result = yield db_1.client.db().collection("blogs").insertOne(newBlog);
            return newBlog;
        });
    },
    //GET - return by ID
    /*    async returnBlogById(id: string) : Promise<Blog []> {
            let blog = blogs.find(p => p.id === id);
            return blog
        },*/
    updateBlog(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = exports.blogs.find(b => b.id === id);
            if (blog) {
                blog.name = body.name;
                blog.description = body.description,
                    blog.websiteUrl = body.websiteUrl;
                return true;
            }
            else {
                return false;
            }
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < exports.blogs.length; i++) {
                if (exports.blogs[i].id === id) {
                    exports.blogs.splice(i, 1);
                    return true;
                }
            }
            return false;
        });
    }
};
