import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";
import { Skeleton } from "./Skeleton";

export const FullBlog = ()=>{
    const {id} = useParams();
    const {loading,blog} = useBlog({
        id: id||""
    })

    if (loading || blog == undefined) {
        return <div className="flex justify-center pt-24">
        <div className="grid grid-cols-12 w-full max-w-screen-lg">
            <div className=" col-span-8 "><Skeleton/></div>
            <div className=" col-span-4 mx-9"><Skeleton/></div>
            
        </div>
        </div>
    }
    return <div>
        <AppBar/>
        <div className="flex justify-center pt-16">
        <div className="grid grid-cols-12 w-full max-w-screen-lg">
            <div className=" col-span-8 ">
                <div className="">
                <div className="text-5xl font-bold my-3">
                    {blog.title}
                </div>
                <div className="flex text-slate-500 font-medium text-sm">
                   <p>Posted on:</p> {blog.created.split("T")[0]}
                </div>
                <div className="mt-5 text-slate-600">
                    {blog.content}
                </div>
                </div>
            </div>
            <div className=" col-span-4 mx-9">
                <div>Author</div>
                <div className=" flex mt-5">
                <div className="flex justify-center flex-col"><Avatar name={blog.author.name}/></div>
                <div className="ml-3">
                <div className="text-xl font-bold">{blog.author.name || "Chirag Kottary"}</div>
                <div className="text-slate-400">Master of Nothing</div>
                </div>    
                </div>
            </div>

        </div>
        </div>
    </div>
}