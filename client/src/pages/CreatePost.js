import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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


export const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

        function createNewPost(ev)
        {
            const data= new FormData();
            data.set('title', title);
            data.set('summary',summary);
            data.set('content',content);
            data.set('files',files[0]);
            ev.preventDefault();

            //console.log(files)

            fetch('http://localhost:4000/post',{
                methos:'POST',
                body: data
            })
        }

  return (
    <form onSubmit={createNewPost}>

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
        onChange={(content)=>setContent(setContent)} 
        
        modules={modules} 
        formats={formats} />
        <button>Create Post</button>
    </form>
  )
}
