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
    <div className='p-[10px] max-w-[700px] mx-auto bg-red-300'>

        {posts.length > 0 && posts.map(post=>(
          
          <PostCard {...post} />
        ))}
    </div>
  )
}
