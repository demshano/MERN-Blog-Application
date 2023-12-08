import { Link } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
export const PostCard = ({_id, title, summary, content, cover,createdAt, author}) => {
  return (

    <div className='post grid grid-cols-2 gap-[20px] mb-[50px] mt-10 '>

        <div className='col-span-1 shadow-lg w-[235px] h-[160px]'>

          <Link to={`/post/${_id}`}>
                <img className='w-[225px] h-[150px] transition-transform duration-300 ease-in transform hover:scale-105  flex justify-center items-center mx-auto py-2 px-2' src={'http://localhost:4000/'+cover} alt="post1Img" />
          </Link>
          {/* hover:scale-105 hover:w-[235px] hover:h-[160px] */}
          
        </div>
                
        <div className='texts col-span-1'>

            <Link to={`/post/${_id}`}>
                <h2 className='m-0 text-2xl font-bold'>{title}</h2>
            </Link>

            <p className='text-xs'>
            <a href="" className='font-bold'>{author.userName}</a><br />
            <time className='text-zinc-500'>{formatISO9075(new Date(createdAt))}</time>

            </p>

            <p className='text-xs mt-[8px]'> 
                {summary}
            </p>
        </div>

        <div className='h-1 w-[700px] ml-20 bg-slate-300 mt-10 rounded-2xl'></div>

    </div>
  )
}
