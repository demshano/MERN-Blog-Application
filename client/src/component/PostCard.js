
export const PostCard = () => {
  return (
    <div className='post grid grid-cols-2 gap-[20px] mb-[50px]'>

        <div className='col-span-1'>
                <img className='' src="https://techcrunch.com/wp-content/uploads/2023/04/elon-owns-twitter.jpg?w=430&h=230&crop=1" alt="post1Img" />
        </div>
                
        <div className='texts col-span-1'>
            <h2 className='m-0 text-2xl font-bold'>Elon Musk’s Twitter a year later: Everything you need to know</h2>

            <p className='text-xs'>
            <a href="" className='font-bold'>Amanda Silberling, Alyssa Stringer</a><br />
            <time className='text-zinc-500'>10:45 PM GMT+5:30•October 27, 2023</time>

            </p>

            <p className='text-xs mt-[8px]'> 
                Welcome to Elon Musk’s Twitter (now X), where the rules are made up and 
                the check marks don’t matter.
                The Tesla and SpaceX CEO announced his bid to buy Twitter in April 2022, zealously driven to rid the platform of spam bots and protect free speech; now, it’s the one-year anniversary since he made his dramatic entrance to the company in October 2022,
                and the platform has changed so much that even its name is different.
            </p>
        </div>

    </div>
  )
}
