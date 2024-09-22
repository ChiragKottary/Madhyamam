import { Link } from "react-router-dom"

export const  BlogCard = ({id,title,content,authorName,date}:{id:string,title:string,content:string,authorName:string,date:string}) => {
    return <Link to={"/blog/"+ id}>
        <div className="drop-shadow-md border-b mt-3 max-w-2xl cursor-pointer">
            <div className="flex ">
                <div><Avatar name={authorName}/></div>
                <div className="flex justify-center flex-col mx-2">{authorName}</div>
                <div className="flex justify-center flex-col"><Doted/></div>
                <div className="flex justify-center flex-col">{date.split("T")[0]}</div>
            </div>
            <div className="font-semibold text-2xl">
            {title}
            </div>
            <div className="text-gray-500 font-medium">
            {content.slice(0,100)+"...."}
            </div>
            <div className="text-gray-400 font-light text-sm mt-2">
                {Math.ceil(content.length/100)+" min read"}
        </div>  
    </div>
    </Link>
    
    
}

export const Avatar = ({name}:{name:string})=>{
    if (name == null) {
        name = "ChiragKottary"
    }
    return <div>
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 rounded-full ">
        <span className="font-light text-gray-600">{name[0].toUpperCase()}{name[1].toUpperCase()}</span>
        </div>
    </div>
}
const Doted = ()=>{
    return <div className="bg-slate-500 w-1 h-1 rounded-full mx-2">

    </div>
}