import { useContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext";
export const Header = () => {

  //const navigate = useNavigate();

    const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials: 'include',
    }).then(response =>{
      response.json().then(userInfo =>{
          setUserInfo(userInfo);
      })
    })
  },[]);


   function logOut()
  {
      //invalidate the cookies
        fetch('http://localhost:4000/logout',{
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
  }

  const user_name  = userInfo?.userName;



  return (

    <main className='p-[10px] max-w-[700px] mx-auto bg-red-300'>
        <header className='flex justify-between mb-[50px] mt-[20px]'>

<Link to="/" className='logo no-underline font-bold text-lg'>MyBlog</Link>

    <nav className='flex gap-[15px]'>

      {user_name && (
        <>
        <Link to={'/create'}>Create new post</Link>
        {/* <Link to={'/login'}> */}
          <a onClick={logOut}>Logout</a>
        {/* </Link> */}
        </>
        
      )} 
      {!user_name && (
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
      )}

        
    </nav>

</header>
    </main>

  )
}

