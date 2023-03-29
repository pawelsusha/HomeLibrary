import {Blog, Paginator, Post} from "./types/types";
import {postsCollection} from "./repositories/posts-db-repository";
import {blogsCollection} from "./repositories/blogs-db-repository";
import {SortDirection} from "mongodb";


export const QueryRepository = {
    async PaginatorForBlogs (PageSize: number, Page: number, sortBy : string, sortDirection: SortDirection, searchNameTerm : string) : Promise <Blog[]> {
        const skipSize: number = ((Page - 1) * PageSize)
        return blogsCollection
            .find({name: {$regex: searchNameTerm, $options : 'i'}}, {projection: {_id: 0}})
            .sort({[sortBy] : sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .toArray()
    },
    async PaginatorForPosts (PageCount: number, PageSize: number, Page: number, sortBy : string, sortDirection: SortDirection) : Promise <Post[]> {
        const skipSize: number = ((Page - 1) * PageSize)
        return postsCollection
            .find({}, {projection: {_id: 0}})
            .sort({[sortBy] : sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .toArray()
    },
    async PaginatorForPostsByBlogId(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: SortDirection, blogId: string): Promise<Post[]> {
        const skipSize: number = ((Page - 1) * PageSize)
        return postsCollection
            .find({blogId: blogId}, {projection: {_id: 0}})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .toArray()
    },
    async PaginationForm (PageCount: number, PageSize: number, Page: number, total: number, Items: Post[] | Blog []) : Promise <Paginator> {
        const paginator : Paginator = {
            pagesCount: PageCount,
            page: Page,
            pageSize: PageSize,
            totalCount: total,
            items : Items
        }
        return paginator;
    },

};