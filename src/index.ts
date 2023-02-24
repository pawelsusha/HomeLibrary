import express, {NextFunction, query, Request, Response} from 'express';
import bodyParser from 'body-parser'
import {blogsRouter} from "./routes/blogs-router";
import {basicAuth, postsRouter} from "./routes/posts-router";
import {posts, postsRepository} from "./repositories/posts-repository";
import {blogs, blogsRepository} from "./repositories/blogs-repository";
import {body} from "express-validator";
import {adminAuth} from "./MiddleWares/auth-middleware";
export { NextFunction };

const app = express()
app.use(bodyParser({}))

const port = 3000
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)


app.delete('/testing/all-data', (req:Request, res: Response ) => {
    blogs.splice(0,blogs.length);
    posts.splice(0,posts.length);
    res.send(204);
})

app.get('/', (req, res) => {
    res.send('Blog Platform 23Feb2023/2254')
})
//app.use(basicAuth)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



