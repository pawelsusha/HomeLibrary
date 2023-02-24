"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = exports.posts = void 0;
exports.posts = [
    {
        id: "string",
        title: "string",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        // blogName : "string"
    }
];
exports.postsRepository = {
    findPosts(title) {
        if (title) {
            let filteredPosts = (exports.posts.filter(p => p.title.indexOf(title) > -1));
            return filteredPosts;
        }
        else {
            return exports.posts;
        }
    },
    getPostById(id) {
        let post = exports.posts.find(p => p.id === id);
        return post;
    },
    createPost(post, blogName) {
        const newPost = {
            id: '' + (+(new Date())),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blogName
        };
        exports.posts.push(newPost);
        return newPost;
    },
    updatePost(id, string) {
        let post = exports.posts.find(p => p.id === id);
        if (post) {
            post.title = string;
            return true;
        }
        else {
            return false;
        }
    },
    deletePost(id) {
        for (let i = 0; i < exports.posts.length; i++) {
            if (exports.posts[i].id === id) {
                exports.posts.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};
