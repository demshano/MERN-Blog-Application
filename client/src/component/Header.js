import { Link } from "react-router-dom"
export const Header = () => {
  return (

    <main className='p-[10px] max-w-[700px] mx-auto bg-red-300'>
        <header className='flex justify-between mb-[50px] mt-[20px]'>

<Link to="/" className='logo no-underline font-bold text-lg'>MyBlog</Link>

    <nav className='flex gap-[15px]'>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </nav>

</header>
    </main>

  )
}

