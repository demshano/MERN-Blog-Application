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
      strings: ['<i>curious.</i>', '<i>consistency.</i>', '<i>motivation.</i>'],
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

    <main className='p-[10px]  h-[300px] mx-auto bg-sky-300 '>
      
        <header className='flex justify-between mb-[50px] mt-[20px] overflow-hidden'>

      <div>


            <Link to="/" className='logo no-underline font-bold  md:ml-36 lg:ml-44'>
              <span className=" md:text-5xl text-3xl">Quantum</span>
              <span className="text-white md:text-lg text-sm ml-2">Pulse</span>
            </Link>

          <div className="ml-44 mt-10 p-4 hidden md:block lg:block">
            <span className="lg:text-8xl md:text-6xl font-extrabold italic">Stay</span>
            <span className="italic lg:text-5xl md:text-3xl font-medium" ref={el} />
          </div>

      </div>

      <div className="absolute xl:ml-[800px]  lg:ml-[700px] mt-[100px]  md:ml-[480px] sm:ml-[200px] ml-[100px]">
        {/* md:ml-[480px] sm:ml-[200px] ml-[100px]  */}
        <div className="font-medium tracking-wider lg:text-lg md:text-base sm:text-sm text-sm ">Discover stories, thinking, and expertise </div>
        <div className="font-medium tracking-wider lg:text-lg md:text-base sm:text-sm text-sm ">from writers on any topic</div>
        {/* lg:text-lg md:text-base sm:text-sm text-sm  */}
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

    <nav className='flex gap-[15px] '>

      {user_name && (
        <>
        <Link className="text-white font-bold " to={'/create'} >
            <span className="hidden sm:inline">Create new post</span>
            <span className="sm:hidden">Create</span>
          </Link>
      
      
      <div className="bg-black text-white font-bold h-8 flex justify-center items-center px-2 rounded-md cursor-pointer">

          <a onClick={logOut}>Logout</a>
      </div>
        
        </>
        
      )} 
      {!user_name && (
        <div className="mr-44 mt-4">
        <Link className="font-medium mr-8" to="/login">Sign in</Link>
        <Link className="bg-black text-white p-2 rounded-md " to="/register">Get Started</Link>
        </div>
      )}

        
    </nav>

        </header>
    </main>
  

  )
}


