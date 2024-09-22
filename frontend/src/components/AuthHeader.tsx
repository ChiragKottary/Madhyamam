import { Link } from "react-router-dom"

export const AuthHeader = ({type }:{type:string})=>{
    return <div>
                    <div className="font-extrabold text-3xl">
                        {type === "signup" ? "Create an account" : "Login to your Account" }
                        
                    </div>
                    <div className="text-slate-400 text-sm">
                        {type === "signup"? "Already Have an account?" : "Dont have an account"}
                        
                        <Link className="ml-3 underline" to={type==="signup"?"/signin":"/signup"}>
                            {type === "signup"? "Login": "Signup"}</Link>
                    </div>
    </div>
}