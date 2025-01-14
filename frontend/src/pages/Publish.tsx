import { useForm } from "react-hook-form"
import { RTE } from "../components/RTE"
import { useState } from "react";
import axios from 'axios'
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
const {control} = useForm();
const [title , setTitle] = useState("");
const [description , setDescription] = useState("")
const navigate = useNavigate()
  return (
    <div className="flex justify-center w-full pt-8">   
    <div className="max-w-screen-lg w-full">
        <input type="text" id="first_name" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
        placeholder="John" required 
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
        />
   <RTE name="description" control={control} defaultValue="Default Value"
      setDescription={setDescription}
   />

<button type="button"
 className=" text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
 onClick={async()=>{
 try{const res= await axios.post(`${BACKEND_URL}/api/v1/blog`,{
    title,
    content : description
  },{
    headers:{
      Authorization:localStorage.getItem("token")
    }
  })
  navigate(`/${res.data.id}`)
 }
catch(e){
console.log(`there is an error ${e}`)
}}}

>Publish</button>
    </div>
    </div>
  )
}

