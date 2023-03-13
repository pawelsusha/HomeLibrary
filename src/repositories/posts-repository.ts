import {Blog, BlogInputModel, blogs, blogsRepository} from './blogs-repository'
export type Post = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
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
        id: "1",
        title: "first",
        shortDescription: "firstDesc",
        content: "firstCont",
        blogId: "1",
        blogName : "firstblog"
    },
    {
        id: "2",
        title: "second",
        shortDescription: "secDesc",
        content: "seccont",
        blogId: "2",
        blogName : "second"
    }
];

export const postsRepository = {
    async returnAllPosts() : Promise<Post[]>{
        return posts
    },
/*    postsRepository = {
    findPosts(title: string | null | undefined) {
        if (title) {
            let filteredPosts = (posts.filter(p => p.title.indexOf(title) > -1))
            return filteredPosts
        } else {
            return posts
        }
    },*/
   async getPostById(id: string): Promise <Post | boolean> {
        let post = posts.find(p => p.id === id)
        if (post) {
            post.id = id
            return post;
        } else {
            return false;
        }
    },
    async createPost(post: Post, blogId:string, blogName:string): Promise <Post | null> {
        const newPost: Post = {
            id: new Date().toISOString(),
            title : post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: blogId,
            blogName: blogName,
           // createdAt:new Date().toISOString()
        }
        posts.push(newPost);
        return newPost;
    },
    async updatePost(id: string, body: PostInputModel): Promise <Post | boolean> {
        let post = posts.find(p => p.id === id)
        if (post) {
            post.title = body.title
            post.shortDescription = body.shortDescription
            post.content = body.content
            return true;
        } else {
            return false;
        }
    },
    async deletePost(id: string): Promise<boolean> {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false
    }


}
