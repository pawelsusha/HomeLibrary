import {Request, Response} from "express";
import {blogsRouter} from "../routes/blogs-router";
//import {Post, posts} from "./posts-db-repository";
import {client} from "../db/db";
import {SortDirection, WithId} from "mongodb";
import {blogsRepository} from '../repositories/blogs-db-repository';
import {QueryRepository} from "../queryRepo";
import {Paginator} from "../types/types";

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
export const blogsServices = {
    /*async returnAllBlogs(): Promise<Blog[]> {
        return blogsRepository.returnAllBlogs();
    },*/
    async returnAllBlogs(PageSize: number, Page: number, sortBy : string, sortDirection: SortDirection, searchNameTerm : string ) : Promise<Paginator>{
        const total = await blogsRepository.returnAllBlogs(searchNameTerm)
        const PageCount = Math.ceil( total / PageSize)
        const items = await QueryRepository.PaginatorForBlogs(PageSize, Page, sortBy, sortDirection, searchNameTerm);
        return QueryRepository.PaginationForm(PageCount, PageSize, Page, total, items)
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
    async updateBlogById(blog : Blog, id: string): Promise<boolean> {
        /*const result = await client.db().collection<Blog>("blogs")
            .updateOne({id: id}, {
                $set: {name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl},
            })
        return result.matchedCount === 1*/
        return await blogsRepository.updateBlogById(blog, id)


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
