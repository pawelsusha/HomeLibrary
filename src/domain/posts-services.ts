import {Blog, BlogInputModel, blogs, blogsRepository} from '../repositories/blogs-db-repository'
import {client} from "../db/db";
import {postsRepository} from '../repositories/posts-db-repository';
import {QueryRepository} from "../queryRepo";
import {Paginator} from "../types/types";
import {SortDirection} from "mongodb";
import {log} from "util";

export type Post = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
    createdAt: string
}
export type PostInputModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string

}
export let posts = [
    {
        "id": "1",
        "title": "first",
        "shortDescription": "firstDesc",
        "content": "firstCont",
        "blogId": "1",
        "blogName": "firstblog"
    },
    {
        "id": "2",
        "title": "second",
        "shortDescription": "secDesc",
        "content": "seccont",
        "blogId": "2",
        "blogName": "second"
    }
];

export const postsService = {
    async returnAllPost(PageSize: number, Page: number, sortBy : string, sortDirection: SortDirection) : Promise<Paginator>{
        //const total = (await postsRepository.returnAllPosts())
        const total = await postsRepository.returnAllPosts()
        const PageCount = Math.ceil( total / PageSize)
        const Items = await QueryRepository.PaginatorForPosts(PageCount, PageSize, Page, sortBy, sortDirection);
        console.log(Items)
        return QueryRepository.PaginationForm(PageCount, PageSize, Page, total, Items)
    },
    async returnAllPostByBlogId (PageSize: number, Page: number, sortBy : string, sortDirection: SortDirection, blogId: string) : Promise<Paginator>{
        let total = (await postsRepository.getAllPostsByBlogId(blogId))
        let totalNumber
        if (total === null) {
            totalNumber = 0
        } else {
            totalNumber = total.length
        }
        const PageCount = Math.ceil( totalNumber / PageSize)
        const Items = await QueryRepository.PaginatorForPostsByBlogId(PageCount, PageSize, Page, sortBy, sortDirection, blogId);
        return QueryRepository.PaginationForm(PageCount, PageSize, Page, totalNumber, Items)
    },
    async getPostById(id: string): Promise<Post | null> {
        return postsRepository.getPostById(id);
    },
    async createPost(post: Post, blogId: string, blogName: string): Promise<Post | null> {
        const newPost: Post = {
            id: '' + (+(new Date())),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()
        }
        const createdPost = await postsRepository.createPost(newPost)
        return createdPost;
    },
    async updatePost(post: Post, id: string): Promise<Post | boolean> {
        return await postsRepository.updatePost(post, id)
    },
    async deletePost(id: string): Promise<boolean> {
        return await postsRepository.deletePost(id)
    },
    async deleteAllData() {
        return await postsRepository.deleteAllData()
    },
    //return all posts by blogId
    async getAllPostsByBlogId(blogId : string) : Promise<Post[]>{
        return postsRepository.getAllPostsByBlogId(blogId)
    }
}



