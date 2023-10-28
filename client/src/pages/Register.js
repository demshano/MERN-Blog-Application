import React from 'react'

export const Register = () => {
  return (
    <>

    <h1 className='text-5xl font-bold text-center mt-[20px]'>Register</h1>
    
    <form action="" className='bg-slate-400 max-w-[400px] mx-auto mt-[200px] p-12'>

    <div className=''>
        <label htmlFor="username">username</label>
        <input className='ml-[30px] rounded' type="text" placeholder='username' />
    </div>

    <div className='mt-[20px]'>
        <label htmlFor="password">password</label>
        <input className='ml-[30px] rounded' type="password" name="" id="" placeholder='password' />
    </div>

    <button className='bg-red-800 w-[62px] rounded text-white relative mt-[30px]'>Register</button>

</form>
    </>
  )
}
