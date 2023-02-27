import express, {NextFunction, Request, Response} from 'express';
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {posts} from "./repositories/posts-repository";
import {blogs} from "./repositories/blogs-repository";

export { NextFunction };

const app = express()
app.use(express.json())

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



