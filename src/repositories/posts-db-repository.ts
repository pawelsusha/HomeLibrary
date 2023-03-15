import {Blog, BlogInputModel, blogs, blogsRepository} from '../repositories/blogs-db-repository'
import {client} from "../db/db";

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

export const postsRepository = {
        async returnAllPosts(): Promise<Post[]> {
            const posts = await client.db().collection<Post>("posts").find({}, {projection: {_id: 0}}).toArray()
            return posts
        },
        async getPostById(id: string): Promise<Post | null> {
            const post = await client.db().collection<Post>("posts").findOne({id: id}, {projection: {_id: 0}})
            return post;
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
            const result = await client.db().collection<Post>("posts").insertOne(newPost)
            return this.getPostById(newPost.id)
        },
        async updatePost(post: Post, id: string): Promise<Post | boolean> {
            const result = await client.db().collection<Post>("posts")
                .updateOne({id: id}, {
                    $set:
                        {
                            title: post.title,
                            shortDescription: post.shortDescription,
                            content: post.content,
                            blogId: post.blogId
                        },
                })
            return result.matchedCount === 1
        },
        async deletePost(id: string): Promise<boolean> {
            const result = await client.db().collection<Post>("posts").deleteOne({id: id})
            return result.deletedCount === 1
        },
        async deleteAllData() {
            const result = await client.db().collection<Post>("posts").deleteMany({});
            return [];
            //return posts
        },
    }



