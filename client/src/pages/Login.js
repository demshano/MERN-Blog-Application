import React, { useContext, useState } from 'react'
import { Navigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export const Login = () => {

  const [userName, setUserName]=useState('');
  const [password, setPassword]=useState('');
  const [redirect, setRedirect]=useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function login(ev)
  {
    ev.preventDefault();
      
    const response = await fetch('http://localhost:4000/login', {
      method:'POST',
      body: JSON.stringify({userName, password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include',
    });

    if(response.ok)
    {
      response.json().then(userInfo =>{
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }
    else
    {
      alert('wrong credentioals');
    }
  
  
  }

  if(redirect)
  {
    return <Navigate to={'/'} />
  }

  return (

    // <>
    //     <h1 className='text-5xl font-bold text-center mt-[20px]'>Login</h1>

    //   <form onSubmit={login} action="" className='bg-slate-400 max-w-[400px] mx-auto mt-[200px] p-12'>

    //       <div className=''>
    //           <label htmlFor="username">username</label>
    //           <input value={userName} onChange={(ev)=>setUserName(ev.target.value)} className='ml-[30px] rounded' type="text" placeholder='username' />
    //       </div>

    //       <div className='mt-[20px]'>
    //           <label htmlFor="password">password</label>
    //           <input value={password} onChange={(ev)=>setPassword(ev.target.value)} className='ml-[30px] rounded' type="password" name="" id="" placeholder='password' />
    //       </div>

    //       <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Login</button>
    //       <Link to='/register'>
    //       <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Register</button>
    //       </Link>

    //   </form>
    // </>

    <div className="flex">
  {/* Left side with blue background */}

  <div className="flex-shrink-0 hidden   w-1/2 h-screen bg-sky-300 rounded-r-full md:flex flex-col justify-center items-center">
  <div className="flex">
    <span className="mr-2 text-black text-6xl font-bold ">Quantum</span>
    <span className='text-white ml-2 mt-6 text-2xl'>Pulse</span>
  </div>
</div>




  {/* Right side with login form */}
  <div className="flex-1 flex items-center justify-center md:mt-0 mt-32">
    <div className="max-w-[400px] p-12 bg-white rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>

      <form onSubmit={login}>
        <div className="mb-4">
          <label className='text-gray-300' htmlFor="username">Username</label>
          <input
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            className="block w-[300px] border-b border-black text-center bg-transparent focus:outline-none focus:border-black"
            type="text"
            // placeholder="Username"
          />
        </div>

        <div className="mb-4">
          <label className='text-gray-300' htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="block w-[300px] border-b border-black text-center bg-transparent focus:outline-none focus:border-black"
            type="password"
            // placeholder="Password"
          />
        </div>

        <button className="w-full rounded text-sky-400 font-bold mt-4">Continue</button>
      </form>

      <div className='flex justify-center items-center mx-auto'>
        <span className="mr-2">Not Account?</span>
        <Link to="/register">
          <span className="text-gray-400 mt-4">Register</span>
        </Link>
    </div>


    </div>
  </div>


</div>


    
  )
}

