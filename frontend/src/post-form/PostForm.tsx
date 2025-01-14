import { useCallback } from "react"
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";

interface PostForm{
  title : string ; 
  content : string ;
}

interface PostFormProps{
  post : PostForm
}

export const PostForm = ({post} :PostFormProps) => {
  const {register ,handleSubmit,watch , setValue , control , getValues} = useForm({
          defaultValues:{
            title: post?.title || "",
            content : post?.content || ""
          }
  })
  const navigate = useNavigate()

  return (
    <div>PostForm</div>
  )
}
