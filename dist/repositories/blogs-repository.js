"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogs = void 0;
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
        return exports.blogs;
    },
    getBlogsById(id) {
        let blog = exports.blogs.find(b => b.id === id);
        if (blog) {
            blog.id = id;
            return blog;
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
    //GET - return by ID
    returnBlogById(id) {
        let blog = exports.blogs.find(p => p.id === id);
        return blog;
    },
    updateBlog(id, body) {
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
