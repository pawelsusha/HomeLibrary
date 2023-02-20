"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.basicAuth = exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
//import {body, validationResult} from "express-validator";
//import {Post, Blog} from "../types/types";
const InputValidationMiddleWare_1 = require("../MiddleWares/InputValidationMiddleWare");
exports.postsRouter = (0, express_1.Router)({});
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'qwerty' } });
//Get All Posts By no auth
exports.postsRouter.get('/', (req, res) => {
    const foundPosts = posts_repository_1.postsRepository.findPosts(req.query.title
        ? req.query.toString()
        : null);
    res.send(foundPosts);
});
//Get Post By ID no Auth
exports.postsRouter.get('/:id', (req, res) => {
    let post = posts_repository_1.postsRepository.getPostById(+req.params.id);
    if (post) {
        res.send(post);
    }
    else {
        res.send(404);
    }
});
//Create Post  + Auth
exports.postsRouter.post('/', exports.adminAuth, InputValidationMiddleWare_1.postValidationMiddleware, (req, res) => {
    const newPost = posts_repository_1.postsRepository.createPost(req.body, req.body.blog.Name);
    res.status(201).send(newPost);
});
//Update Post By ID + Auth
exports.postsRouter.put('/:id', exports.adminAuth, InputValidationMiddleWare_1.postValidationMiddleware, (req, res) => {
    const isUpdated = posts_repository_1.postsRepository.updatePost(+req.params.id, req.body);
    if (isUpdated) {
        const post = posts_repository_1.postsRepository.getPostById(+req.params.id);
        res.send(post);
    }
    else {
        res.send(404);
    }
});
//Delete Post By ID + Auth
exports.postsRouter.delete('/:id', exports.adminAuth, (req, res) => {
    const isDeleted = posts_repository_1.postsRepository.deletePost(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
