import express, {NextFunction, Request, Response} from 'express';
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {posts} from "./repositories/posts-db-repository";
import {blogs} from "./repositories/blogs-db-repository";
import {runDb} from "./db/db";


export { NextFunction };

export const app = express()
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
    res.send('Blog Platform 13Mar2023/1454')
})
//app.use(basicAuth)

export const startApp = async() =>{
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()


