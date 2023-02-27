"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const posts_repository_1 = require("./repositories/posts-repository");
const blogs_repository_1 = require("./repositories/blogs-repository");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.use('/blogs', blogs_router_1.blogsRouter);
app.use('/posts', posts_router_1.postsRouter);
app.delete('/testing/all-data', (req, res) => {
    blogs_repository_1.blogs.splice(0, blogs_repository_1.blogs.length);
    posts_repository_1.posts.splice(0, posts_repository_1.posts.length);
    res.send(204);
});
app.get('/', (req, res) => {
    res.send('Blog Platform 23Feb2023/2254');
});
//app.use(basicAuth)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
