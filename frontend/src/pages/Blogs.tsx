import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const {loading,blogs} = useBlogs();
    if (loading) {
        return <div>
            <AppBar />
            <div className="flex justify-center mt-28">
            <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </div>
            </div>    
            </div>
    }


    return <div>
    <div><AppBar/></div>
    <div className="flex justify-center ">
    <div className="">
        <div className="max-w-2xl">
        {
            blogs.map((blog)=>(
                <BlogCard 
                id = {blog.id}
                authorName={blog.author.name || "chirag"}
                date={blog.created}
                title={blog.title}
                content={blog.content} 
                />
        
            ))
        }
    </div>    
    </div>
    </div>
    </div>
    
}