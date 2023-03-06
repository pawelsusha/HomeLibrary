import {Request, Response} from "express";
import {blogsRouter} from "../routes/blogs-router";
import {posts} from "./posts-repository";


export type Blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export type BlogInputModel = {
    name: string,
    description: string,
    websiteUrl: string
}

export let blogs = [
    {
        "id": "1",
        "name": "first",
        "description": "blablbalblab",
        "websiteUrl": "www.one.by"
    }
];
export const blogsRepository = {
      async returnAllBlogs() : Promise <Blog[]>{
            return blogs
        },

    async getBlogsById(id: string): Promise<Blog | undefined> {
        let blog : Blog | undefined = blogs.find(p => p.id === id);
        return blog
    },
    async createBLog(blog: Blog): Promise<Blog> {
        const newBlog = {
            id: '' + (+(new Date())),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        }
        blogs.push(newBlog)
        return newBlog;
    },
    //GET - return by ID
/*    async returnBlogById(id: string) : Promise<Blog []> {
        let blog = blogs.find(p => p.id === id);
        return blog
    },*/
    async updateBlog(id: string, body: BlogInputModel): Promise <boolean> {
        let blog = blogs.find(b => b.id === id)
        if (blog) {
            blog.name = body.name
            blog.description = body.description,
            blog.websiteUrl = body.websiteUrl
            return true;
        } else {
            return false;
        }
    },
    async deleteBlog(id: string) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false
    }
}