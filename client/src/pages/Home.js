import { useState, useEffect } from "react"
import { PostCard } from "../component"

export const Home = () => {

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/post').then(response =>{
      response.json().then(posts =>{
        setPosts(posts)
        //console.log(posts);
      })
    })
  },[])

  return (
    <div className='px-[100px] py-[50px] max-w-[900px] mx-auto mt-8 rounded-md bg-sky-200 mb-10'>

        {posts.length > 0 && posts.map(post=>(
          
          <PostCard {...post} />
        ))}
    </div>
  )
}
