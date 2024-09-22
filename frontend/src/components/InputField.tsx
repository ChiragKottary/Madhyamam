import { ChangeEvent } from "react";

interface InputTypes{
    lable: string;
    placeholder : string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type ?:string
}
export const InputField = ({lable,placeholder,onChange,type}:InputTypes) => {
    return <div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 mt-3">{lable}</label>
            <input type={type || "text"} id="first_name" onChange={onChange} className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}