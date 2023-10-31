import { Link } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
export const PostCard = ({_id, title, summary, content, cover,createdAt, author}) => {
  return (
    <div className='post grid grid-cols-2 gap-[20px] mb-[50px]'>

        <div className='col-span-1'>

          <Link to={`/post/${_id}`}>
                <img className='w-[225px] h-[150px]' src={'http://localhost:4000/'+cover} alt="post1Img" />
          </Link>
          
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

    </div>
  )
}
