import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"

interface RTEProps {
  name: string;
  control: any;
  label?: string;
  defaultValue?: string;
  setDescription : (value : string)=> void;
  
}
export const RTE = ({name , control,label, defaultValue = "",setDescription } :RTEProps)=> {
  const stripHtmlTags = (content:string) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.textContent || div.innerText || "";
  };
    return (
      <div className="w-full"> 
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller name={name || "content"}
      control={control}
      render={({field:{onChange}})=>(
        <Editor
        apiKey="nfg8uci39ohcepdsrnl3tbknjn936otemr5kkyxhxf6v2m6d"
        initialValue={defaultValue}
        init={
          {
            branding : false,
            height : 500 , 
            menubar :true, 
            plugins:[
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:'undo redo | formatselect | bold italic backcolor | \ alignleft aligncenter alignright alignjustify | \ bullist numlist outdent indent | removeformat | help'
          }
        }
        onEditorChange={(description)=>{
          const plaintext = stripHtmlTags(description)
          setDescription(plaintext);
          onChange(plaintext)
        }}
        />
      )}
      />
      </div>
    )
  }
