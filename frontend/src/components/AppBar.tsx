import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useState } from "react";

export const AppBar=()=>{
    return <div>
        <div className="border-b-4 py-2">
        <div className="flex justify-between">
            <Link to={'/blogs'} className=" cursor-pointer">
            <div className="flex ">
            <div className="ml-8"><img src="https://www.pngitem.com/pimgs/m/214-2148059_medium-logo-png-transparent-png.png" width="60px" alt="NaN"/></div>
            <p className="flex justify-center flex-col font-extrabold text-2xl ml-2">Madhyamam</p>
            </div>
            </Link>
            <div className="flex">
                <Link to={"/publish"}>
            <button type="button" className="mr-14 mt-2  text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400
             to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300
               font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
                </Link>
            <div className="mr-10 flex justify-center flex-col"><DropDown/></div>
             </div>
        </div>
        </div>
        
    </div>
}

export const DropDown =()=>{
            let  name = localStorage.getItem("name")
    if (name == null) {
        console.log("not name");
        name= "Chirag"
    }
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  function pageSignOut(){
        navigate("/");
        localStorage.clear();
  }
    return (
    <div className="relative">
      <button
        id="dropdownUserAvatarButton"
        onClick={toggleDropdown}
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <Avatar name={name}/>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownAvatar"
          className="absolute  mb-4 right-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{name}</div>
          </div>
          <div className="py-2">
            <button onClick={pageSignOut} className=" block pl-4 py-2 pr-24 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
            
          </div>
        </div>
      )}
    </div>
  );
};