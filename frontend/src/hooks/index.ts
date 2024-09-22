import axios from "axios";
import { useEffect, useState } from "react"

interface Blog{
            "id": string,
            "title": string,
            "content":string,
            "created": string,
            "authorId": string,
            "author": {
                "name": string
            }      
}

export const useBlog = ({id}:{id:string})=>{
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] =useState<Blog>();

    useEffect(()=>{
        axios.get(`${process.env.BACKEND_URL}/api/v1/book/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((res)=>{
            
            const data :Blog = res.data.blog;
            setBlog(data);
            setLoading(false);
        })
    },[id])

    return {
        blog,loading
    }
}
export const useBlogs = ()=>{
    const [loading, setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${process.env.BACKEND_URL}/api/v1/book/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((res)=>{
            const data :Blog[] = res.data.blog
            setBlogs(data);
            setLoading(false);
        })
    },[])
    
    return {
        loading,
        blogs
    }
}