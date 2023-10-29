import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export const Login = () => {

  const [userName, setUserName]=useState('');
  const [password, setPassword]=useState('');
  const [redirect, setRedirect]=useState(false);

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
      setRedirect(true);
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

    <>
        <h1 className='text-5xl font-bold text-center mt-[20px]'>Login</h1>

      <form onSubmit={login} action="" className='bg-slate-400 max-w-[400px] mx-auto mt-[200px] p-12'>

          <div className=''>
              <label htmlFor="username">username</label>
              <input value={userName} onChange={(ev)=>setUserName(ev.target.value)} className='ml-[30px] rounded' type="text" placeholder='username' />
          </div>

          <div className='mt-[20px]'>
              <label htmlFor="password">password</label>
              <input value={password} onChange={(ev)=>setPassword(ev.target.value)} className='ml-[30px] rounded' type="password" name="" id="" placeholder='password' />
          </div>

          <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Login</button>

      </form>
    </>

    
  )
}

