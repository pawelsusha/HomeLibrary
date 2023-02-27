"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.basicAuth = exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const InputValidationMiddleWare_1 = require("../MiddleWares/InputValidationMiddleWare");
const InputValidationMiddleWare_2 = require("../MiddleWares/InputValidationMiddleWare");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.postsRouter = (0, express_1.Router)({});
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'qwerty' } });
//Get All Posts By no auth
exports.postsRouter.get('/', (req, res) => {
    const foundPosts = posts_repository_1.postsRepository.findPosts(req.query.title
        ? req.query.toString()
        : null);
    res.status(200).send(foundPosts);
});
//Get Post By ID no Auth
exports.postsRouter.get('/:id', (req, res) => {
    let post = posts_repository_1.postsRepository.getPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
        return;
    }
    else {
        res.status(404);
        return;
    }
});
//Create Post  + Auth
exports.postsRouter.post('/', exports.adminAuth, InputValidationMiddleWare_2.inputValidationMiddleware, InputValidationMiddleWare_1.postValidationMiddleware, (req, res) => {
    console.log(req.body);
    const blog = blogs_repository_1.blogsRepository.getBlogsById(req.body.blogId);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const newPost = posts_repository_1.postsRepository.createPost(req.body);
    res.status(201).send(newPost);
    return;
});
//Update Post By ID + Auth
exports.postsRouter.put('/:id', exports.adminAuth, InputValidationMiddleWare_2.inputValidationMiddleware, InputValidationMiddleWare_1.postValidationMiddleware, (req, res) => {
    const isUpdated = posts_repository_1.postsRepository.updatePost(req.params.id, req.body);
    if (isUpdated) {
        const post = posts_repository_1.postsRepository.getPostById(req.params.id);
        res.sendStatus(204).send(post);
    }
    else {
        res.sendStatus(404);
    }
});
//Delete Post By ID + Auth
exports.postsRouter.delete('/:id', exports.adminAuth, (req, res) => {
    const isDeleted = posts_repository_1.postsRepository.deletePost(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
