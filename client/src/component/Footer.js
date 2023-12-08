import { Link } from "react-router-dom"

 export const Footer=() => {
  return (
    <div className='w-full h-[300px] bg-sky-800' >

        <div className="py-6">
            <Link to="/" className='logo no-underline font-bold text-lg ml-44'>
              <span className="text-5xl">Quantum</span>
              <span className="text-white ml-2">Pulse</span>
            </Link>
        </div>


        <div className="mt-20">
            <ul className="flex justify-around text-slate-300 text-lg ">
                <Link className="hover:text-white">Help</Link>
                <Link className="hover:text-white">Status</Link>
                <Link className="hover:text-white">About</Link>
                <Link className="hover:text-white">Careers</Link>
                <Link className="hover:text-white">Blog</Link>
                <Link className="hover:text-white">Privacy</Link>
                <Link className="hover:text-white">Terms</Link>
                <Link className="hover:text-white">Text to Speech</Link>
            </ul>
        </div>

        <div className="flex justify-center mt-10 text-white mx-auto">
            <span>2023© All Right Reserved</span>
        </div>

    </div>
  )
}
