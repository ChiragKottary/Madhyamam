import { InputField } from "./InputField"
import { useState } from "react"
import {SignUpInput} from "@chiragkottary/medium-common"
import { AuthHeader } from "./AuthHeader"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"

export const AuthSignUp = ()=>{
         const [postInputs,setPostInputs] = useState< SignUpInput>({
            name:"",
            email:"",
            password:""
    })
    const errorNotify = () => toast("Somthing Went Wrong");
    const SuccesNotify = () => toast("User Signed Up");
    const navigate = useNavigate();
    
   
    const SubmitSignUp =async ()=>{
        try {
        const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/signup`,postInputs)
        const token = response.data.id;
        const name = response.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        SuccesNotify();
        navigate("/blogs")
        } catch (error) {
            errorNotify()
        } 
    }
    return <div>
        <div className=""><ToastContainer/></div>
        <div className="h-screen  flex flex-col justify-center ">
            <div className="flex justify-center">
                <div>
                <div className="px-10">
                    <AuthHeader type={"signup"} />
                </div>
                <InputField lable="Name" placeholder="Jhon Deo" onChange={(e)=>{
                    setPostInputs((postInputs)=>({
                        ...postInputs,
                        name:e.target.value
                    }))
                }}/>
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
                 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full mt-4" onClick={SubmitSignUp}>Sign Up</button>
                </div>
                </div>
            </div>
            
        </div>
    </div>
}