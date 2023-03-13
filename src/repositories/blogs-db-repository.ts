import {Request, Response} from "express";
import {blogsRouter} from "../routes/blogs-router";
import {posts} from "./posts-db-repository";
import {client} from "../db/db";
import {WithId} from "mongodb";

export type Blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
    createdAt: string
    isMembership: boolean
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
    async returnAllBlogs(): Promise<Blog[]> {
        const blogs = await client.db().collection<Blog>("blogs").find({}).toArray()
        return blogs
    },

    async getBlogsById(id: string): Promise<Blog | undefined | null> {
        //let blog : Blog | undefined = blogs.find(p => p.id === id);
        //const blog = await client.db().collection<Blog>("blog").find({id: {$regex: id}}).toArray()
        const blog = await client.db().collection<Blog>("blogs").findOne({id: id})
        if (blog) {
            return blog
        } else {
            return null
        }
    },
    async createBLog(blog: Blog): Promise<Blog> {
        const newBlog = {
            id: '' + (+(new Date())),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: "" + new Date(),
            isMembership: false,
        }
        const result = await client.db().collection<Blog>("blogs").insertOne(newBlog)
        return newBlog;
    },
    async updateBlog(id: string, blog: Blog): Promise<boolean> {
        const result = await client.db().collection<Blog>("blogs")
            .updateOne({id: id}, {
                $set: {name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl},
            })
        return result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await client.db().collection<Blog>("blogs").deleteOne({id: id})
        return result.deletedCount === 1
    },
    //delete all data
    async deleteAllData() {
        const result = await client.db().collection<Blog>("blogs").deleteMany({})
        return []
    },
}