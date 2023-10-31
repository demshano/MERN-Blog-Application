import { useState } from "react";
import { Navigate } from "react-router-dom";
import ReactQuill from 'react-quill';


const modules = {
    toolbar: {
      container: [
        [{ 'header': [1,2,false]}],
        ['bold', 'italic', 'underline','strike','blockqoute'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
        
      ]
      
    }}

    const formats =[
        'header',
        'bold','italic', 'underline','strike','blockqoute',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

export const EditPost = () => {


    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);



    function updatePost()
    {

    }

    if(redirect)
    {
      return <Navigate to={'/'} />
    }

  return (
    <form onSubmit={updatePost}>

        <input type="title" placeholder='Title' 
        valie={title} 
        onChange={(ev)=>setTitle(ev.target.value)} 
        />
        <input type="summary" placeholder='Summary'
        valie={summary} 
        onChange={(ev)=>setSummary(ev.target.value)} 
         />
        <input type="file" 
        //value={files}
        onChange={(ev)=>setFiles(ev.target.files)}
        />
        
        <ReactQuill 
        value={content} 
        //checkout the video
        onChange={(newValue)=>setContent(newValue)} 
        
        module={modules} 
        formats={formats} />
        <button>Create Post</button>
    </form>
  )
}

