"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogs = void 0;
exports.blogs = [
    {
        "id": "string",
        "name": "string",
        "description": "string",
        "websiteUrl": "string"
    }
];
exports.blogsRepository = {
    returnAllBlogs() {
        return exports.blogs;
    },
    getBlogsById(id) {
        let blog = exports.blogs.find(b => b.id === id);
        if (blog) {
            blog.id = id;
            return true;
        }
        else {
            return false;
        }
    },
    createBLog(blog) {
        const newBlog = {
            id: '' + (+(new Date())),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        };
        exports.blogs.push(newBlog);
        return newBlog;
    },
    updateBlog(id, name) {
        let blog = exports.blogs.find(b => b.id === id);
        if (blog) {
            blog.name = name;
            return true;
        }
        else {
            return false;
        }
    },
    deleteBlog(id) {
        for (let i = 0; i < exports.blogs.length; i++) {
            if (exports.blogs[i].id === id) {
                exports.blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};
