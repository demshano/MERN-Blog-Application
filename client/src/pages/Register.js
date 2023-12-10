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
//     <>

// <div className='w-1/2 h-full bg-sky-300'></div>

//     <h1 className='text-5xl font-bold  mt-[20px]'>Register</h1>
    
//     <form onSubmit={register} action="" className='bg-sky-400 max-w-[400px]  mt-[200px] p-12 rounded-md'>

//     <div className=''>
//         <label htmlFor="username">username</label>
//         <input className='ml-[30px] rounded' type="text" placeholder='username'
//         value={userName}
//         onChange={(ev)=>setUserName(ev.target.value)}

//         />
        
//     </div>

//     <div className='mt-[20px]'>
//         <label htmlFor="password">password</label>
//         <input className='ml-[30px] rounded' type="password" name="" id="" placeholder='password'
//         value={password}
//         onChange={(ev)=>setPassword(ev.target.value)}
        
//         />
//     </div>

//     <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Register</button>
// <Link to={'/login'}>
// <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Login</button>
// </Link>

// </form>


//     </>


<div className="flex h-screen">
  {/* Left side */}

  <div className="flex-1 p-8">
    {/* Your form and registration title go here */}
        <form onSubmit={register} action="" className='bg-sky-400 max-w-[400px]  mt-[200px] p-12 rounded-md'>

        <h1 className="">
          <span className='text-2xl font-medium'>Join</span>
          <span className='text-5xl font-bold ml-4'>Quantum</span>
          <span className='text-white font-bold'>pulse</span>
        </h1>

        <div className='mt-8'>
            <label htmlFor="username" className="block text-gray-500 dark:text-gray-400">Username</label>
            <div className="relative">
              <input
                className="block w-full border-b border-black text-center bg-transparent focus:outline-none focus:border-black"
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
              />
            </div>
        </div>


        <div className='mt-8'>
            <label htmlFor="password" className="block text-gray-500 dark:text-gray-400">Password</label>
            <div className="relative">
              <input
                className="block w-full border-b border-black text-center bg-transparent focus:outline-none focus:border-black "
                type="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
        </div>


    <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Register</button>
 <Link to={'/login'}>
 <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Login</button>
 </Link>

 </form>

    
  </div>

  {/* Right side */}
  <div className="flex-1 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-full h-full bg-sky-300 rounded-tl-full rounded-bl-full"></div>
    {/* Your content for the curved-box goes here */}
  </div>
</div>

  )
}
