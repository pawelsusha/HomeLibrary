"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            return exports.posts;
        });
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
        return __awaiter(this, void 0, void 0, function* () {
            let post = exports.posts.find(p => p.id === id);
            if (post) {
                post.id = id;
                return post;
            }
            else {
                return false;
            }
        });
    },
    createPost(post, blogId, blogName) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                id: new Date().toISOString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: blogId,
                blogName: blogName,
                // createdAt:new Date().toISOString()
            };
            exports.posts.push(newPost);
            return newPost;
        });
    },
    updatePost(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < exports.posts.length; i++) {
                if (exports.posts[i].id === id) {
                    exports.posts.splice(i, 1);
                    return true;
                }
            }
            return false;
        });
    }
};
