import { useContext, useEffect, useState, useRef } from "react"
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext";
import Typed from 'typed.js';

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

  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<i>curious.</i>'],
      typeSpeed: 100,
      backSpeed: 75,
      showCursor: false,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);



  return (

    <main className='p-[10px] w-full h-[300px] mx-auto bg-sky-300'>
        <header className='flex justify-between mb-[50px] mt-[20px]'>

      <div>


            <Link to="/" className='logo no-underline font-bold text-lg ml-44'>
              <span className="text-5xl">Quantum</span>
              <span className="text-white ml-2">Pulse</span>
            </Link>

          <div className="ml-44 mt-20 md:block sm:hidden">
            <span className="text-8xl font-extrabold italic">Stay</span>
            <span className="italic text-5xl font-medium" ref={el} />
          </div>

      </div>

      <div className="absolute ml-[650px] mt-[100px]">
        <div className="font-medium tracking-wider">Discover stories, thinking, and expertise </div>
        <div className="font-medium tracking-wider">from writers on any topic</div>
      {!user_name && (
          <Link to={'/register'}>
          <div className="mt-4">
          
            <button className="bg-black text-white px-4 py-2 rounded-md tracking-wider">Start Writing</button>
            
          </div>
          </Link>
      )}
        {user_name && (
            <Link to={'/create'}>
            <div className="mt-4">
            
              <button className="bg-black text-white px-4 py-2 rounded-md tracking-wider">Start Writing</button>
              
            </div>
            </Link>
        )}
      
      </div>

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
        <div className="mr-44">
        <Link className="font-medium mr-8" to="/login">Sign in</Link>
        <Link className="bg-black text-white p-2 rounded-md" to="/register">Get Started</Link>
        </div>
      )}

        
    </nav>

        </header>
    </main>

  )
}


