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
    <>

    <h1 className='text-5xl font-bold text-center mt-[20px]'>Register</h1>
    
    <form onSubmit={register} action="" className='bg-sky-400 max-w-[400px] mx-auto mt-[200px] p-12 rounded-md'>

    <div className=''>
        <label htmlFor="username">username</label>
        <input className='ml-[30px] rounded' type="text" placeholder='username'
        value={userName}
        onChange={(ev)=>setUserName(ev.target.value)}

        />
        
    </div>

    <div className='mt-[20px]'>
        <label htmlFor="password">password</label>
        <input className='ml-[30px] rounded' type="password" name="" id="" placeholder='password'
        value={password}
        onChange={(ev)=>setPassword(ev.target.value)}
        
        />
    </div>

    <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Register</button>
<Link to={'/login'}>
<button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Login</button>
</Link>

</form>
    </>
  )
}
