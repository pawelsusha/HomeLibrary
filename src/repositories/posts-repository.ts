import {Blog, BlogInputModel, blogs, blogsRepository} from '../repositories/blogs-repository'
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
    returnAllPosts(){
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
    getPostById(id: string) {
        let post = posts.find(p => p.id === id)
        if (post) {
            post.id = id
            return post;
        } else {
            return false;
        }
    },
    createPost(post: Post, blogId:string, blogName:string): Post{
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
    updatePost(id: string, body: PostInputModel) {
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
    deletePost(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false
    }


}
