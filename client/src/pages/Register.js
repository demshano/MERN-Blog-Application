import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {

    const [userName, setUserName]=useState('');
    const [password, setPassword]=useState('');

    const navigate = useNavigate();


     async function register(ev)
    {
        ev.preventDefault();
      
        const response = await fetch('http://localhost:4000/register', {
          method:'POST',
          body: JSON.stringify({userName, password}),
          headers:{'Content-Type':'application/json'},
        })

        if(response.ok === true)
        {
          alert('Registration is successfull');
        }
        else
        {
          alert('Registration is failed');
        }

        {navigate('/login')}
      
      
    }

  return (


<div className="flex h-screen">


  <div className="flex-1 p-8">
    
        <form onSubmit={register} action="" className='bg-sky-400 max-w-[400px]  mt-[150px] p-12 ml-28 rounded-md'>

        <h1 className="">
          <span className='text-2xl font-medium'>Join</span>
          <span className='text-5xl font-bold ml-4'>Quantum</span>
          <span className='text-white font-bold'>pulse</span>
        </h1>

        <div className='mt-8'>
            <label htmlFor="username" className="block text-gray-50">Username</label>
            <div className="relative">
              <input
                className="block w-full border-b border-black text-center bg-transparent focus:outline-none focus:border-black"
                type="text"
                // placeholder="Username"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
              />
            </div>
        </div>


        <div className='mt-8'>
            <label htmlFor="password" className="block text-gray-50 ">Password</label>
            <div className="relative">
              <input
                className="block w-full border-b border-black text-center bg-transparent focus:outline-none focus:border-black "
                type="password"
                // placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
        </div>


    <button className='  font-bold text-xl text-white relative mt-[30px] flex justify-center mx-auto'>Register</button>
 {/* <Link to={'/login'}>
 <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Login</button>
 </Link> */}

 </form>

    
  </div>

  


<div className="flex-1 relative overflow-hidden">
  <div className="absolute top-0 right-0 w-full h-full bg-sky-300 rounded-tl-full rounded-bl-full"></div>
  {/* Your content for the curved-box goes here */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
    <span className=" text-black text-6xl font-bold ">Quantum</span>
    <span className="text-white ml-2 text-2xl">Pulse</span>
  </div>
</div>





</div>
   

  )
}
