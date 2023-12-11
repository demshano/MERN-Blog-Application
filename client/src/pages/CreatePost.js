import { useState } from "react";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Editor } from "../Editor";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  
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

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();

    //console.log(files);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (

<div className="mt-24 my-4 border-4 border-sky-400 flex justify-center items-center mx-auto w-[600px]">
  <form onSubmit={createNewPost} className="max-w-md mx-auto p-4">
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

    <button className="bg-sky-500 text-white py-2 px-4 rounded font-semibold flex justify-center mx-auto">Create Post</button>
  </form>
</div>



  );
};
