import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export const Editor = ({value, onChange}) => {

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


  return (
    <ReactQuill 
        value={value} 
        theme={'snow'}
        onChange={onChange} 
        modules={modules} 
        
        />
  )
}
