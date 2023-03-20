import {Request, Response} from "express";
import {blogsRouter} from "../routes/blogs-router";
//import {Post, posts} from "./posts-db-repository";
import {client} from "../db/db";
import {WithId} from "mongodb";
import {blogsRepository} from '../repositories/blogs-db-repository';

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
export const blogsService = {
    async returnAllBlogs(): Promise<Blog[]> {
        // const blogs = await client.db().collection<Blog>("blogs").find({}).toArray()
        //const blogs = await client.db().collection<Blog>("blogs").find({}, {projection: {_id: 0}}).toArray()
        return blogsRepository.returnAllBlogs();
    },

    async getBlogsById(id: string): Promise<Blog | null> {
        //let blog : Blog | undefined = blogs.find(p => p.id === id);
        //const blog = await client.db().collection<Blog>("blog").find({id: {$regex: id}}).toArray()
        //const blog = await client.db().collection<Blog>("blogs").findOne({id: id}, {projection: {_id: 0}})
        //return blog;
        return blogsRepository.getBlogsById(id);
    },
    async createBLog(blog: Blog): Promise<Blog | null> {
        const newBlog = {
            id: '' + (+(new Date())),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            //createdAt: "" + new Date(),
            createdAt: new Date().toISOString(),
            isMembership: false
        }
            //const result = await client.db().collection<Blog>("blogs").insertOne(newBlog)
        const CreatedBlog = await blogsRepository.createBLog(newBlog)
        return CreatedBlog
    },
    async updateBlog(id: string, blog: Blog): Promise<boolean> {
        /*const result = await client.db().collection<Blog>("blogs")
            .updateOne({id: id}, {
                $set: {name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl},
            })
        return result.matchedCount === 1*/
        return await blogsRepository.updateBlog(id,blog)


    },
    async deleteBlog(id: string): Promise<boolean> {
        /*const result = await client.db().collection<Blog>("blogs").deleteOne({id: id})
        return result.deletedCount === 1*/
        return await blogsRepository.deleteBlog(id)
    },
    //delete all data
    async deleteAllData() {
       /* const result = await client.db().collection<Blog>("blogs").deleteMany({})
        return []*/
        return await blogsRepository.deleteAllData()
    },
}