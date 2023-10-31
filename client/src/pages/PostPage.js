import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import {formatISO9075} from 'date-fns';
import { UserContext } from "../UserContext";

export const PostPage = () => {

  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();

  useEffect(()=>{
  
    fetch(`http://localhost:4000/post/${id}`)
    .then(response =>{
      response.json().then(postInfo => {

        setPostInfo(postInfo);
      })
    })
  },[]);

  if(!postInfo) return '';




  return (
    <div>

      <h1>{postInfo.title}</h1>

      <div>
        <img className='w-[225px] h-[150px]' src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>

      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>

      <div>by {postInfo.author.userName}</div>

      


      {userInfo.id === postInfo.author._id && (
        <div>
          <Link to={`/edit/${postInfo._id}`}>
            Edit this post
            </Link>
        </div>
      )}


      <div dangerouslySetInnerHTML={{__html:postInfo.content}} />

    </div>
  )
}

