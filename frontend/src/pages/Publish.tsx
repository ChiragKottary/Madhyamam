import { useState } from "react"
import { AppBar } from "../components/AppBar"
import {CreateBlog} from '@chiragkottary/medium-common'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

export const Publish=()=>{
    const [createPost,setCreatePost] = useState<CreateBlog>({
        title:"",
        content:""
    })
    
    const navigate = useNavigate();

    return <div>
    <AppBar />
    <div className=" flex justify-center mt-3">
        <div className="w-full max-w-screen-lg">
        <label  className="block mb-2 text-sm font-medium text-gray-900">Your Title</label>
        <input type="text" id="helper-text" aria-describedby="helper-text-explanation" 
        onChange={(e)=>{
            setCreatePost({
                ...createPost,
                title:e.target.value,
            })}}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"/>

        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-3">
        <div className="px-2 py-2 bg-white rounded-t-lg">
           <textarea className="w-full  text-sm text-gray-900 bg-white border-0  focus:ring-0 "
           onChange={(e)=>{
            setCreatePost({
                ...createPost,
                content:e.target.value,
            })}}
           placeholder="Write Content..." required ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button type="submit" onClick={async ()=>{
            try {
            const response =await axios.post(`${BACKEND_URL}/api/v1/book/upload`,createPost,{
            headers: {
            "Authorization": localStorage.getItem("token")
            }});
            console.log(response.data);
            
            navigate(`/blog/${response.data.message}`)
        } catch (error) {
            console.log(error);
            
        }
           }} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
               Post Blog
           </button>
        </div>
        </div>
    
        </div>
    </div>
    </div>
}