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
exports.adminAuth = exports.basicAuth = exports.postsRouter = void 0;
const express_1 = require("express");
const posts_db_repository_1 = require("../repositories/posts-db-repository");
const InputValidationMiddleWare_1 = require("../MiddleWares/InputValidationMiddleWare");
const InputValidationMiddleWare_2 = require("../MiddleWares/InputValidationMiddleWare");
const blogs_db_repository_1 = require("../repositories/blogs-db-repository");
const posts_services_1 = require("../domain/posts-services");
const pagination_helpers_1 = require("../helpers/pagination-helpers");
//import {blogsServices} from "../domain/blogs-services";
exports.postsRouter = (0, express_1.Router)({});
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'qwerty' } });
//Get All Posts By no auth
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pageSize = pagination_helpers_1.paginationHelpers.pageSize(req.query.pageSize);
    let pageNumber = pagination_helpers_1.paginationHelpers.pageNumber(req.query.pageNumber);
    let sortBy = pagination_helpers_1.paginationHelpers.sortBy(req.query.sortBy);
    let sortDirection = pagination_helpers_1.paginationHelpers.sortDirection(req.query.sortDirection);
    let allPosts = yield posts_services_1.postsService.returnAllPost(pageSize, pageNumber, sortBy, sortDirection);
    res.status(200).send(allPosts);
}));
//Get Post By ID no Auth
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let post = yield posts_db_repository_1.postsRepository.getPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
//Create Post  + Auth
exports.postsRouter.post('/', exports.adminAuth, InputValidationMiddleWare_1.postValidationMiddleware, InputValidationMiddleWare_2.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const blog = yield blogs_db_repository_1.blogsRepository.getBlogsById(req.body.blogId);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const newPost = yield posts_services_1.postsService.createPost(req.body, blog.id, blog.name);
    res.status(201).send(newPost);
    return;
}));
//Update Post By ID + Auth
exports.postsRouter.put('/:id', exports.adminAuth, InputValidationMiddleWare_1.postValidationMiddleware, InputValidationMiddleWare_2.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield posts_db_repository_1.postsRepository.updatePost(req.body, req.params.id);
    if (isUpdated) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
//Delete Post By ID + Auth
exports.postsRouter.delete('/:id', exports.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_db_repository_1.postsRepository.deletePost(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
