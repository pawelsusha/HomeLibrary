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
export const postsCollection = client.db().collection<Post>("posts");
export const postsRepository = {
        async returnAllPosts(): Promise<Post[]> {
            const posts = await postsCollection.find({}, {projection: {_id: 0}}).toArray()
            return posts
        },
        async getPostById(id: string): Promise<Post | null> {
            const post = await postsCollection.findOne({id: id}, {projection: {_id: 0}})
            return post;
        },
        async createPost(newPost: Post): Promise<Post | null> {
           /* const newPost: Post = {
                id: '' + (+(new Date())),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: blogId,
                blogName: blogName,
                createdAt: new Date().toISOString()
            }*/
            const result = await postsCollection.insertOne(newPost)
            return this.getPostById(newPost.id)
            //return newPost
        },
        async updatePost(post: Post, id: string): Promise<Post | boolean> {
            const result = await postsCollection
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
            const result = await postsCollection.deleteOne({id: id})
            return result.deletedCount === 1
        },
        async deleteAllData() {
            const result = await postsCollection.deleteMany({});
            return [];
            //return posts
        },
    //return all posts by blogId
    async getAllPostsByBlogId(blogId : string) : Promise<Post[]>{
        return postsCollection.find({blogId}, {projection: {_id: 0}}).toArray()
    }
    }



