import {Blog, blogs,blogsRepository} from '../repositories/blogs-repository'
export type Post = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}
export const posts = [
    {
        id: "string",
        title: "string",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName : "string"
    }
];

export const postsRepository = {
    findPosts(title: string | null | undefined) {
        if (title) {
            let filteredPosts = (posts.filter(p => p.title.indexOf(title) > -1))
            return filteredPosts
        } else {
            return posts
        }
    },
    getPostById(id: string) {
        let post = posts.find(p => p.id === id)
        return post;

    },
    createPost(post: Post, blogName: string ) {
        const newPost = {
            id: '' + (+(new Date())),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blogName,
            createdAt : "" + new Date()
        }
        posts.push(newPost)
        return newPost
    },
    updatePost(id: string, string: string) {
        let post = posts.find(p => p.id === id)
        if (post) {
            post.title = string
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
