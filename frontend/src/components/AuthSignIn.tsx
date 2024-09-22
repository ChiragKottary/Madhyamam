
import { InputField } from "./InputField"
import { useState } from "react"
import {SignInInput} from "@chiragkottary/medium-common"
import { AuthHeader } from "./AuthHeader"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const AuthSignIn = ()=>{
         const [postInputs,setPostInputs] = useState<SignInInput>({
            email:"",
            password:""
        })
    const navigate = useNavigate()
    
   
    
    const SubmitSignIn =async ()=>{
        try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs)
        const jwt = response.data
        localStorage.setItem("token", jwt.token);
        localStorage.setItem("name", jwt.name);
        
        navigate("/blogs")
        } catch (error) {
    
        } 
    }

    return <div>
        <div className="h-screen  flex flex-col justify-center ">
            <div className="flex justify-center">
                <div>
                <div className="px-10">
                    <AuthHeader type={"signin"} />
                </div>
                
                <InputField lable="Email" placeholder="jhondeo@gmail.com" onChange={(e)=>{
                    setPostInputs((postInputs)=>({
                        ...postInputs,
                        email:e.target.value
                    }))
                }}/>
                <InputField lable="Password" placeholder="*********" onChange={(e)=>{
                    setPostInputs((postInputs)=>({
                        ...postInputs,
                        password:e.target.value
                    }))
                }} type="password"/> 

                <div>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full mt-4" onClick={SubmitSignIn}>Sign In</button>
                </div>
                </div>
            </div>
            
        </div>
    </div>
}