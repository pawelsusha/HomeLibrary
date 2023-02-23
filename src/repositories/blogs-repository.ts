import {Request, Response} from "express";
import {blogsRouter} from "../routes/blogs-router";
import {posts} from "./posts-repository";


export type Blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export const blogs = [
    {
        "id": "1",
        "name": "first",
        "description": "blablbalblab",
        "websiteUrl": "www.one.by"
    }
];
export const blogsRepository = {
        returnAllBlogs(){
            return blogs
        },

    getBlogsById(id: string) {
        let blog = blogs.find(b => b.id === id)
        if (blog) {
            blog.id = id
            return blog;
        } else {
            return false;
        }

    },
    createBLog(blog: Blog) {
        const newBlog = {
            id: '' + (+(new Date())),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        }
        blogs.push(newBlog)
        return newBlog
    },
    //GET - return by ID
    returnBlogById(id: string) {
        let blog = blogs.find(p => p.id === id);
        return blog
    },
    updateBlog(id: string, name: string) {
        let blog = blogs.find(b => b.id === id)
        if (blog) {
            blog.name = name
            return true;
        } else {
            return false;
        }
    },
    deleteBlog(id: string) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false
    }
}