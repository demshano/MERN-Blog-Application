import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Editor } from "../Editor";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();


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

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
       setContent(postInfo.content);
      setSummary(postInfo.summary);
    
      
      });
    });
  },[]);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set('id', id);

    if(files?.[0]){

        data.set("file", files?.[0]); //files can be exmpty
    }
    const response = await fetch('http://localhost:4000/post', {
        method:'PUT',
        body:data,
        credentials: 'include',

    });
    if(response.ok)
    {

        setRedirect(true);
    }
  
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />;
  }

  return (
    // <form onSubmit={updatePost}>
    //   <input
    //     type="title"
    //     placeholder="Title"
    //     value={title}
    //     onChange={(ev) => setTitle(ev.target.value)}
    //   />
    //   <input
    //     type="summary"
    //     placeholder="Summary"
    //     value={summary}
    //     onChange={(ev) => setSummary(ev.target.value)}
    //   />
    //   <input
    //     type="file"
    //     //value={files}
    //     onChange={(ev) => setFiles(ev.target.files)}
    //   />

    

    //   <ReactQuill 
    //     value={content} 
    //     theme={'snow'}
    //     onChange={newValue => setContent(newValue)} 
    //     modules={modules} 
        
    //     />



    //   <button>Update Post</button>
    // </form>

    
<div className="mt-24 my-4 border-4 border-sky-400 flex justify-center items-center mx-auto w-[600px]">
  <form onSubmit={updatePost} className="max-w-md mx-auto p-4">
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-400 font-medium italic ">Title</label>
      <input
        type="title"
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
    </div>

    <div className="mb-4">
      <label htmlFor="summary" className="block text-gray-400 font-medium italic">Summary</label>
      <input
        type="summary"
        className="border p-2 w-full"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
    </div>

    <div className="mb-4">
      <label htmlFor="image" className="block text-gray-400 font-medium italic">Upload Image</label>
      <input
        type="file"
        className="border p-2 w-full"
        onChange={(ev) => setFiles(ev.target.files)}
      />
    </div>

    <div className="mb-4">
      <label htmlFor="content" className="block text-gray-400 font-medium italic">Content</label>
      <ReactQuill 
        value={content} 
        theme={'snow'}
        onChange={newValue => setContent(newValue)} 
        module={modules} 
      />
    </div>

    <button className="bg-sky-500 text-white py-2 px-4 rounded font-semibold flex justify-center mx-auto">Update Post</button>
  </form>
</div>
  );
};
