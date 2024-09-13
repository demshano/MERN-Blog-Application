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

      <div className="w-full h-24 bg-sky-300">
        <Link to='/'>
          <div className="flex justify-self-start items-center">
            <span className="mr-2 text-black text-6xl font-bold ">Quantum</span>
            <span className='text-white ml-2 mt-6 text-2xl'>Pulse</span>
        </div>
        </Link>
      </div>

      <div className="bg-sky-100 text-center mx-auto ">


      <h1 className="font-bold text-4xl italic py-8">{postInfo.title}</h1>

      <div>
        <img className='w-[525px] h-[450px] mx-auto' src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>

      <time className="text-gray-400">{formatISO9075(new Date(postInfo.createdAt))}</time>

      <div className="italic">by {postInfo.author.userName}</div>

      <div className="text-sky-300 font-medium text-4xl py-4">{postInfo.summary}</div>

      


      


      <div className="xl:w-[1200px] lg:w-[1000px] md:w-[600px] sm:w-[400px] w-[300px] text-left mx-auto  bg-sky-200 p-16 rounded-lg flex flex-col" dangerouslySetInnerHTML={{__html:postInfo.content}} />

      <div className="py-4">

      <div className="">
          {userInfo.id === postInfo.author._id && (
            <div className="bg-sky-500 text-white py-2 px-4  rounded font-semibold w-fit flex justify-center items-center mx-auto">
              <Link to={`/edit/${postInfo._id}`}>
                Edit this post
                </Link>
            </div>
          )}
      </div>

      </div>



      </div>

    </div>
  )
}

