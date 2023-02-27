"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = exports.posts = void 0;
exports.posts = [
    {
        id: "1",
        title: "first",
        shortDescription: "firstDesc",
        content: "firstCont",
        blogId: "1",
        blogName: "firstblog"
    },
    {
        id: "2",
        title: "second",
        shortDescription: "secDesc",
        content: "seccont",
        blogId: "2",
        blogName: "second"
    }
];
exports.postsRepository = {
    returnAllPosts() {
        return exports.posts;
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
    getPostById(id) {
        let post = exports.posts.find(p => p.id === id);
        if (post) {
            post.id = id;
            return post;
        }
        else {
            return false;
        }
    },
    createPost(post, blogName, blodId) {
        const newPost = {
            id: '' + (+(new Date())),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            // createdAt:new Date().toISOString()
        };
        exports.posts.push(newPost);
        return newPost;
    },
    updatePost(id, body) {
        let post = exports.posts.find(p => p.id === id);
        if (post) {
            post.title = body.title;
            post.shortDescription = body.shortDescription;
            post.content = body.content;
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
