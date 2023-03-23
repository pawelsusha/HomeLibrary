import {Request, Response} from "express";
import {blogsRouter} from "../routes/blogs-router";
import {Post, posts} from "./posts-db-repository";
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
export const blogsCollection = client.db().collection<Blog>("blogs");
export const blogsRepository = {
/*
        async returnAllBlogs(): Promise<Blog[]> {
       // const blogs = await client.db().collection<Blog>("blogs").find({}).toArray()
        const blogs = await blogsCollection.find({}, {projection: {_id: 0}}).toArray()
        return blogs
    },
*/
    async returnAllBlogs() : Promise<Blog []>{
        return blogsCollection
            .find({}, {projection: {_id: 0}})
            .toArray()

    },

    async getBlogsById(id: string): Promise<Blog | null> {
        //let blog : Blog | undefined = blogs.find(p => p.id === id);
        //const blog = await client.db().collection<Blog>("blog").find({id: {$regex: id}}).toArray()
        const blog = await blogsCollection.findOne({id: id}, {projection: {_id: 0}})
        return blog;
    },
    async createBLog(newBlog: Blog): Promise<Blog | null> {
        //const result = await client.db().collection<Blog>("blogs").insertOne(newBlog)
        const result = await blogsCollection.insertOne(newBlog)
        return (newBlog)
    },
    async updateBlog(id: string, blog: Blog): Promise<boolean> {
        const result = await blogsCollection
            .updateOne({id: id}, {
                $set: {name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl},
            })
        return result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    //delete all data
    async deleteAllData() {
        const result = await blogsCollection.deleteMany({})
        return []
    },
}